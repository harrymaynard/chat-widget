export default interface IMessage {
  text: string
  time: string | Date
  username: string
  chatId?: string
  isRead?: boolean
}
