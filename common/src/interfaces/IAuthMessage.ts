import type IMessage from './IMessage'

export default interface IAuthMessage extends IMessage {
  token: string
}
