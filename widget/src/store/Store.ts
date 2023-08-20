import { ref, computed } from 'vue'
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

export const useStore = defineStore('chat-widget', () => {
  const chat = ref<IChat>()
  const chatId = ref<number>(1)
  const userId = ref<number>(2)
  const userType = ref<UserType>(UserType.Member)
  const userName = ref<string>('John')

  if (process.env.NODE_ENV === 'development') {
    // messages.value = initialMessages
  }

  const messages = computed<Array<IMessage>>(() => {
    if (Array.isArray(chat.value?.messages)) {
      return chat.value?.messages || []
    }
    return []
  })
  
  return {
    chat,
    chatId,
    messages,
    userId,
    userName,
    userType,
  }
})
