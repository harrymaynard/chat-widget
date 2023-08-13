export default interface IMessage {
  chatId: string
  text: string
  time: string | Date
  username: string
  isRead?: boolean
}
