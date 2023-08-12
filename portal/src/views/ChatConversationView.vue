<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { usePortalStore } from '@/store/PortalStore'
import { useWebSocketClientService } from 'common/services/WebSocketClientService'
import { formatISODateTime } from 'common/helpers/DateHelper'
import SideBar from '@/components/SideBar.vue'
import ChatConversation from 'common/components/ChatConversation.vue'

const router = useRouter()
const store = usePortalStore()
const webSocketClientService = useWebSocketClientService()

const chatId: string = router.currentRoute.value.params.chatId as string
const messageInputText = ref<string>('')

const handleSubmitSendMessage = () => {
  console.log('send message')

  webSocketClientService.sendMessage({
    text: messageInputText.value,
    time: formatISODateTime(new Date()),
    username: 'admin',
    chatId,
  })
}
</script>

<template>
  <div class="flex-fill d-flex">
    <div class="sidebar border-end">
      <SideBar/>
    </div>
    <div class="flex-fill d-flex flex-column">
      <div class="flex-fill position-relative">
        <ChatConversation :messages="store.getMessagesByChatId(chatId)"/>
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
