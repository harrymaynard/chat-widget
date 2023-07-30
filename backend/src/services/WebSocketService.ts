import { Server, type Socket } from 'socket.io'
import { formatISODateTime } from 'common/src/helpers/DateHelper'
import LogService from './LogService'

export default class WebSocketService {
  private io: Server | null = null

  constructor() {}

  public async start(httpServer: any): Promise<void> {
    this.io = new Server(httpServer, {
      path: '/api/socket',
    })

    this.io.on('connection', (socket: Socket) => {
      LogService.info('User connected')
      
      socket.on('message', async (message: any, callback: Function) => {
        await socket.emitWithAck('message', {
          text: message.text,
          time: formatISODateTime(new Date()),
          username: 'Server'
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
