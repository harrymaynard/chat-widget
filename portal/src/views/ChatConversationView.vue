<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { usePortalStore } from '@/store/PortalStore'
import { useAPIClientService } from 'common/services/APIClientService'
import { formatISODateTime } from 'common/helpers/DateHelper'
import SideBar from '@/components/SideBar.vue'
import ChatConversation from 'common/components/ChatConversation.vue'
import { useWebSocketClientService } from 'common/services/WebSocketClientService'

const router = useRouter()
const store = usePortalStore()
const APIClientService = useAPIClientService()
const webSocketClientService = useWebSocketClientService()

const chatId: number = parseInt(router.currentRoute.value.params.chatId as string)
const messageInputText = ref<string>('')

onMounted(async () => {
  try {
    if (!webSocketClientService.isConnected()) {
      await webSocketClientService.connect()
    }
    webSocketClientService.joinRoom(chatId)
    const response = await APIClientService.getChatById(chatId)
    store.setChatById(chatId, response.data)
  } catch (error) {
    console.error('Error fetching chat data:', error)
  }
})

onBeforeUnmount(() => {
  webSocketClientService.leaveRoom(chatId)
})

const handleSubmitSendMessage = () => {
  if (!messageInputText.value) {
    return
  }
  APIClientService.postMessage({
    chatId,
    userId: store.userId,
    userType: store.userType,
    text: messageInputText.value,
    createdAt: formatISODateTime(new Date()),
    name: store.userName,
  })
  messageInputText.value = ''
}
</script>

<template>
  <div class="flex-fill d-flex">
    <div class="sidebar border-end">
      <SideBar/>
    </div>
    <div class="flex-fill d-flex flex-column">
      <div class="flex-fill position-relative">
        <ChatConversation
          :messages="store.getMessagesByChatId(chatId)"
          :userId="store.userId"
          :userType="store.userType"
        />
      </div>
      <div class="m-3">
        <form
          class="d-flex"
          @submit.prevent="handleSubmitSendMessage"
        >
          <input
            class="form-control flex-fill"
            v-model="messageInputText"
          />
          <button
            type="submit"
            class="btn btn-primary ms-3"
          >Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 300px;
}
</style>
