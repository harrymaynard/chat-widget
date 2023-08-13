import { ref } from 'vue'
import { defineStore } from 'pinia'
import type IMessage from 'common/interfaces/IMessage'
import UserType from 'common/enums/UserType'

const initialMessages: Array<IMessage> = [
  { chatId: '1', userId: '123', userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: '1', userId: '123', userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: '1', userId: '123', userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: '1', userId: '456', userType: UserType.Admin, text: 'message content here', time: new Date(), name: 'Sally' },
  { chatId: '1', userId: '123', userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: '1', userId: '456', userType: UserType.Admin, text: 'message content here', time: new Date(), name: 'Sally' },
  { chatId: '1', userId: '123', userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: '1', userId: '123', userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
  { chatId: '1', userId: '123', userType: UserType.Member, text: 'message content here', time: new Date(), name: 'John' },
]

export const useStore = defineStore('chat-widget', () => {
  const messages = ref<Array<IMessage>>([])
  const userId = ref<string>('123')
  const userType = ref<UserType>(UserType.Member)
  const userName = ref<string>('John')

  if (process.env.NODE_ENV === 'development') {
    messages.value = initialMessages
  }
  
  return {
    messages,
    userId,
    userName,
    userType,
  }
})
