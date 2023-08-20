<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useWebSocketClientService } from 'common/services/WebSocketClientService'
import type IMessage from 'common/interfaces/IMessage'
import { usePortalStore } from '@/store/PortalStore'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const store = usePortalStore()
const webSocketClientService = useWebSocketClientService({
  chatId: store.chatId,
})

onMounted(async () => {
  webSocketClientService.on('message', handleReceiveMessage)

  try {
    await webSocketClientService.connect()
  } catch (error) {
    console.error('Failed to connect to web socket endpoint.')
  }
})

onBeforeUnmount(() => {
  webSocketClientService.off('message', handleReceiveMessage)
  webSocketClientService.disconnect()
})

const handleReceiveMessage = (message: IMessage) => {
  console.log('received message', message)
  store.addMessageByChatId(message.chatId as number, message)
}
</script>

<template>
  <div class="page d-flex flex-column">
    <header>
      <AppHeader/>
    </header>
    <main class="flex-fill d-flex">
      <RouterView/>
    </main>
    <footer>
      <AppFooter/>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.page {
  width: 100vw;
  min-height: 100vh;
}
</style>
