import UserType from '../enums/UserType'

export default interface IMessage {
  chatId: string
  userId: string
  userType: UserType
  text: string
  time: string | Date
  name: string
  isRead?: boolean
}
