import { Server, type Socket } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { Emitter } from '@socket.io/redis-emitter'
import { createClient } from 'redis'
import { formatISODateTime } from 'common/helpers/DateHelper'
import LogService from './LogService'
import IMessage from 'common/interfaces/IMessage'

interface WebSocketEventTypes {
  message: (message: IMessage) => void
  time: (date: Date) => void
}

export default class WebSocketService {
  private io: Server | null = null
  private emitter: Emitter | null = null
  private pingTimer: any

  constructor() {}

  public async start(httpServer: any): Promise<void> {
    this.io = new Server(httpServer, {
      path: '/api/socket',
    })

    await this.initRedisConnection()

    this.io.on('connection', (socket: Socket) => {
      LogService.info('User connected')
      
      socket.on('message', async (message: IMessage, callback: Function) => {
        this.emitter?.emit('message', {
          chatId: message.chatId,
          text: message.text,
          time: formatISODateTime(new Date()),
          username: message.username,
        })
        callback()
      })

      setInterval(() => {
        socket.emit('ping', formatISODateTime(new Date()))
      }, 5000)
    })

    return Promise.resolve()
  }

  public async stop(): Promise<void> {
    clearInterval(this.pingTimer)

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

  private async initRedisConnection() {
    const pubClient = createClient({
      url: 'redis://localhost:6379' // No auth.
      // url: 'redis://user:pass@localhost:6379' // With auth.
    })
    const subClient = pubClient.duplicate()

    try {
      await Promise.all([
        pubClient.connect(),
        subClient.connect()
      ])
      
      // Create and setup Redis adapter.
      this.io?.adapter(createAdapter(pubClient, subClient))
      
      // Setup emitter.
      this.emitter = new Emitter<WebSocketEventTypes>(pubClient)
    } catch (error) {
      LogService.error('Failed to connect to Redis server')
    }
  }
}
