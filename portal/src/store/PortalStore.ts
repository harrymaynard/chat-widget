import { ref } from 'vue'
import { defineStore } from 'pinia'
import type IMessage from 'common/interfaces/IMessage'

const initialMessages: Array<IMessage> = [
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'server' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
  { chatId: '1', text: 'message content here', time: new Date(), username: 'user' },
]

export const usePortalStore = defineStore('chat-portal', () => {
  const chats = ref<Map<string, Array<IMessage>>>(new Map())

  if (process.env.NODE_ENV === 'development') {
    chats.value.set('1', initialMessages)
  }
  
  const addMessageByChatId = (chatId: string, message: IMessage): void => {
    if (!chats.value.get(chatId)) {
      chats.value.set(chatId, [])
    }
    chats.value.get(chatId)?.push(message)
  }

  const getMessagesByChatId = (chatId: string): Array<IMessage> => {
    return chats.value.get(chatId) || []
  }

  return {
    addMessageByChatId,
    getMessagesByChatId,
  }
})
