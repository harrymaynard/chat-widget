<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useWebSocketClientService } from '@/services/WebSocketClientService'
import IconDash from '@/components/icons/IconDash.vue'

const emit = defineEmits<{
  (eventName: 'close'): void,
}>()

const webSocketClientService = useWebSocketClientService()

const messageInputText = ref<string>('')

onMounted(() => {
  try {
    webSocketClientService.connect()
  } catch (error) {
    console.log('failed to connect', error)
  }
})

onBeforeUnmount(() => {
  webSocketClientService.disconnect()
})

const handleClickCloseChat = () => {
  emit('close')
}

const handleSubmitMessage = () => {
  sendMessage()
}

const handleKeypressMessageInput = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const sendMessage = () => {
  // TODO: Send message.

  messageInputText.value = ''
}
</script>

<template>
  <div class="chat-header">
    <div class="title">Conversation</div>
    <a
      href="javascript:void(0)"
      title="Minimize"
      @click="handleClickCloseChat"
    >
      <IconDash class="close-chat-icon" />
    </a>
  </div>
  <div class="chat-body">Chat conversation here.</div>
  <div class="chat-footer">
    <form @submit.prevent="handleSubmitMessage">
      <textarea
        id="message-input"
        rows="3"
        v-model="messageInputText"
        @keypress="handleKeypressMessageInput"
      ></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.chat-header {
  background: $theme-color-primary;
  color: #FFF;
  padding: 4px;
  display: flex;
  justify-content: center;

  .title {
    flex: 1;
  }
  .close-chat-icon {
    color: #FFF;
  }
}
.chat-body {
  flex: 1;
}
.chat-footer {
  background: $theme-color-primary;
  
  form {
    display: flex;

    #message-input {
      flex: 1;
    }
  }
}
</style>
