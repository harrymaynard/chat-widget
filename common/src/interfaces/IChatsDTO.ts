export default interface IChatsDTO {
  chats: Array<{
    chatId: number
    participantNames: Array<string>
    createdAt: string
  }>
}
