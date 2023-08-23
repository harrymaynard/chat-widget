<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
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
const isChatToolsOpen = ref<boolean>(false)
const name = ref<string>('')

onMounted(() => {
  window.addEventListener('keypress', handleGlobalKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keypress', handleGlobalKeyPress)
  webSocketClientService.off('message', handleReceiveMessage)
  webSocketClientService.disconnect()
})

watch(isChatOpen, async (newValue) => {
  if (newValue && !isChatConnected.value) {
    try {
      await webSocketClientService.connect()
      webSocketClientService.on('message', handleReceiveMessage)

      const chatResponse = await APIClientService.getChatById(store.chatId)
      store.chat = chatResponse.data

      isChatConnected.value = true
    } catch (error) {
      console.error('failed to connect', error)
    }
  }
})

const handleReceiveMessage = (message: IMessage) => {
  console.log('message received', message)
  if (Array.isArray(store.chat?.messages)) {
    store.chat?.messages.push(message)
  }
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

// Open Chat tools menu.
const handleGlobalKeyPress = (event: KeyboardEvent) => {
  if (
    event.ctrlKey &&
    event.altKey &&
    event.shiftKey &&
    event.code === 'KeyP'
  ) {
    isChatToolsOpen.value = true
  }
}

// Save name and create user chat session if one doesn't exist.
const handleSubmitChatTools = () => {
  store.userName = name.value
  isChatToolsOpen.value = false
}
</script>

<template>
  <div>
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
    <TransitionGroup name="chat-tools">
      <div
        v-if="isChatToolsOpen"
        class="chat-tools-container"
      >
        <form @submit.prevent="handleSubmitChatTools">
          <input
            type="text"
            v-model="name"
          />
          <button type="submit">
            Save
          </button>
        </form>
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

.chat-tools-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFF;
  border-top: solid thin #CCC;
}
</style>
