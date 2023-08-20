import { ref } from 'vue'
import { defineStore } from 'pinia'
import type IMessage from 'common/interfaces/IMessage'
import UserType from 'common/enums/UserType'

const initialMessages: Array<IMessage> = [
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: 1, userId: 456, userType: UserType.Admin, text: 'message content here', time: new Date(), name: 'Sally' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: 1, userId: 456, userType: UserType.Admin, text: 'message content here', time: new Date(), name: 'Sally' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: 1, userId: 123, userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
]

export const usePortalStore = defineStore('chat-portal', () => {
  const chats = ref<Map<number, Array<IMessage>>>(new Map())
  const chatId = ref<number>(1)
  const userId = ref<number>(1)
  const userType = ref<UserType>(UserType.Admin)
  const userName = ref<string>('Sally')

  if (process.env.NODE_ENV === 'development') {
    // chats.value.set(1, initialMessages)
  }
  
  const addMessageByChatId = (chatId: number, message: IMessage): void => {
    if (!chats.value.get(chatId)) {
      chats.value.set(chatId, [])
    }
    chats.value.get(chatId)?.push(message)
  }

  const getMessagesByChatId = (chatId: number): Array<IMessage> => {
    return chats.value.get(chatId) || []
  }

  return {
    chatId,
    userId,
    userType,
    userName,
    addMessageByChatId,
    getMessagesByChatId,
  }
})
