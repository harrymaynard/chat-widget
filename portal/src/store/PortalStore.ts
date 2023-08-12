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

export const usePortalStore = defineStore('chat-widget', () => {
  const chats = ref<Map<string, Array<IMessage>>>(new Map())
  chats.value.set('1', initialMessages)
  
  const addMessageByChatId = (chatId: string, message: IMessage): void => {
    chats.value.get(chatId)?.push(message)
  }

  const getMessagesByChatId = (chatId: string): Array<IMessage> => {
    return chats.value.get(chatId) || []
  }

  return {
    chats,
    addMessageByChatId,
    getMessagesByChatId,
  }
})
