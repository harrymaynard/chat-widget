<script lang="ts" setup>
import { type PropType, type Ref, ref, watch, onMounted, nextTick } from 'vue'
import type IMessage from '../interfaces/IMessage'
import ChatMessage from './ChatMessage.vue'

const props = defineProps({
  messages: {
    type: Array as PropType<Array<IMessage>>,
    default: () => []
  },
})

let lastKnownMessageCount: number = 0

const conversationEl = ref<HTMLElement>() as Ref<HTMLElement>

onMounted(() => {
  lastKnownMessageCount = props.messages.length
  scrollToLatestMessage()
})

watch(() => props.messages, (newValue) => {
  if (newValue.length > lastKnownMessageCount) {
    lastKnownMessageCount = newValue.length
    handleReceiveNewMessage()
  }
}, { deep: true })

const handleReceiveNewMessage = () => {
  scrollToLatestMessage()
}

const scrollToLatestMessage = () => {
  nextTick(() => {
    const clientHeight = conversationEl.value.clientHeight
    const scrollHeight = conversationEl.value.scrollHeight
    if (scrollHeight > clientHeight) {
      conversationEl.value.scrollTo({ top: scrollHeight - clientHeight })
    }
  })
}
</script>

<template>
  <div
    ref="conversationEl"
    class="chat-conversation"
  >
    <template
      v-for="(message, index) in props.messages"
      :key="index"
    >
      <ChatMessage :message="message"/>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.chat-conversation {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  // justify-content: flex-end;
}
</style>
