import IMessage from './IMessage'
import IUser from './IUser'

export default interface IChat {
  chatId: number
  messages: Array<IMessage>
  users: Array<IUser>
}
