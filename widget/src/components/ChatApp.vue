<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useStore } from '@/store/Store'
import { useWebSocketClientService } from 'common/services/WebSocketClientService'
import { useAPIClientService } from 'common/services/APIClientService'
import type IMessage from 'common/interfaces/IMessage'
import IconChat from '@/components/icons/IconChat.vue'
import ChatWindow from '@/components/ChatWindow.vue'

const store = useStore()

const APIClientService = useAPIClientService()
const webSocketClientService = useWebSocketClientService({
  chatId: store.chatId,
})

const isChatOpen = ref<boolean>(false)
const isChatConnected = ref<boolean>(false)

onBeforeUnmount(() => {
  webSocketClientService.off('message', handleReceiveMessage)
  webSocketClientService.disconnect()
})

watch(isChatOpen, async (newValue) => {
  if (newValue && !isChatConnected.value) {
    try {
      await webSocketClientService.connect()
      webSocketClientService.on('message', handleReceiveMessage)
      isChatConnected.value = true
    } catch (error) {
      console.error('failed to connect', error)
    }
  }
})

const handleReceiveMessage = (message: IMessage) => {
  console.log('message received', message)
  store.messages.push(message)
}

const handleClickChatIcon = () => {
  isChatOpen.value = !isChatOpen.value
}

const handleCloseChatWindow = () => {
  isChatOpen.value = false
}

const handleSendMessage = async (message: IMessage) => {
  try {
    await APIClientService.postMessage(message)
  } catch (error) {
    console.error('Failed to post message.')
  }
  
}
</script>

<template>
  <div class="component">
    <a
      href="javascript:void(0)"
      class="chat-icon-container"
      @click="handleClickChatIcon"
    >
      <IconChat class="icon" />
    </a>
    <TransitionGroup name="chat-window">
      <div
        v-if="isChatOpen"
        class="chat-container"
      >
        <ChatWindow
          @close="handleCloseChatWindow"
          @sendMessage="handleSendMessage"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

$button-icon-size: 32px;
$button-padding: 10px;
$spacing: 10px;

.chat-icon-container {
  position: fixed;
  bottom: $spacing;
  right: $spacing;
  padding: $button-padding;
  background: $theme-color-primary;
  border-radius: 50%;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, .5);

  .icon {
    width: $button-icon-size;
    height: $button-icon-size;
    color: #FFF;
  }
}
.chat-container {
  position: fixed;
  bottom: $spacing + $button-padding + $button-icon-size + $button-padding + $spacing;
  top: $spacing;
  right: $spacing;
  width: 300px;
  border: solid thin $theme-color-primary;
  background: #FFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, .5);
}
</style>
