import { ref } from 'vue'
import { defineStore } from 'pinia'
import { IMessage } from '@/interfaces/IMessage'

export const useStore = defineStore('chat-widget', () => {
  const messages = ref<Array<IMessage>>([])
  
  return {
    messages,
  }
})
