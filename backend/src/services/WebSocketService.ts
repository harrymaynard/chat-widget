import { Server, type Socket } from 'socket.io'
import { formatISODateTime } from 'common/helpers/DateHelper'
import LogService from './LogService'
import IMessage from 'common/interfaces/IMessage'

export default class WebSocketService {
  private io: Server | null = null

  constructor() {}

  public async start(httpServer: any): Promise<void> {
    this.io = new Server(httpServer, {
      path: '/api/socket',
    })

    this.io.on('connection', (socket: Socket) => {
      LogService.info('User connected')
      
      socket.on('message', async (message: IMessage, callback: Function) => {
        await socket.emitWithAck('message', {
          text: message.text,
          time: formatISODateTime(new Date()),
          username: message.username
        })
        await socket.emitWithAck('message', {
          text: 'Server message',
          time: formatISODateTime(new Date()),
          username: 'server'
        })
        callback()
      })
    })

    return Promise.resolve()
  }

  public async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.io?.close((error) => {
        if (error) {
          reject()
        } else {
          resolve()
        }
      })
    })
  }
}
