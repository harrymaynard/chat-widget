import UserType from '../enums/UserType'

export default interface IMessage {
  messageId?: number
  chatId: number
  userId: number
  userType: UserType
  name: string
  text: string
  createdAt: string | Date
  isRead?: boolean
}
