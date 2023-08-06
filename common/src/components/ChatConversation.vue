<script lang="ts" setup>
import { type PropType } from 'vue'
import type IMessage from '../interfaces/IMessage'
import ChatMessage from './ChatMessage.vue'

const props = defineProps({
  messages: {
    type: Array as PropType<Array<IMessage>>,
    default: () => []
  },
})
</script>

<template>
  <div>
    <template
      v-for="(message, index) in props.messages"
      :key="index"
    >
      <ChatMessage :message="message"/>
    </template>
  </div>
</template>
