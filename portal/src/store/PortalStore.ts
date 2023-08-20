import { ref } from 'vue'
import { defineStore } from 'pinia'
import type IMessage from 'common/interfaces/IMessage'
import type IChat from 'common/interfaces/IChat'
import UserType from 'common/enums/UserType'

const initialMessages: Array<IMessage> = [
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', createdAt: new Date(), name: 'John' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', createdAt: new Date(), name: 'John' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', createdAt: new Date(), name: 'John' },
  { chatId: 1, userId: 456, userType: UserType.Admin, text: 'message content here', createdAt: new Date(), name: 'Sally' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', createdAt: new Date(), name: 'John' },
  { chatId: 1, userId: 456, userType: UserType.Admin, text: 'message content here', createdAt: new Date(), name: 'Sally' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', createdAt: new Date(), name: 'John' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', createdAt: new Date(), name: 'John' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', createdAt: new Date(), name: 'John' },
]

export const usePortalStore = defineStore('chat-portal', () => {
  const chats = ref<Map<number, IChat>>(new Map())
  const userId = ref<number>(1)
  const userType = ref<UserType>(UserType.Admin)
  const userName = ref<string>('Sally')

  if (process.env.NODE_ENV === 'development') {
    // chats.value.set(1, initialMessages)
  }

  const setChatById = (chatId: number, chat: IChat) => {
    chats.value.set(chatId, chat)
  }
  
  const addMessageByChatId = (chatId: number, message: IMessage): void => {
    if (!chats.value.get(chatId)) {
      chats.value.set(chatId, {
        chatId,
        messages: [],
        users: [],
      })
    }
    chats.value.get(chatId)?.messages.push(message)
  }

  const getMessagesByChatId = (chatId: number): Array<IMessage> => {
    return chats.value.get(chatId)?.messages || []
  }

  return {
    userId,
    userType,
    userName,
    setChatById,
    addMessageByChatId,
    getMessagesByChatId,
  }
})
