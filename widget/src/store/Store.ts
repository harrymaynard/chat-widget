import { ref } from 'vue'
import { defineStore } from 'pinia'
import type IMessage from 'common/interfaces/IMessage'

const initialMessages: Array<IMessage> = [
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'server' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
  { text: 'message content here', time: new Date(), username: 'user' },
]

export const useStore = defineStore('chat-widget', () => {
  const messages = ref<Array<IMessage>>(initialMessages)
  
  return {
    messages,
  }
})
