import { Server, type Socket } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { Emitter } from '@socket.io/redis-emitter'
import { createClient } from 'redis'
import { formatISODateTime } from 'common/helpers/DateHelper'
import LogService from './LogService'
import type IAuthMessage from 'common/interfaces/IAuthMessage'
import type IMessage from 'common/interfaces/IMessage'
import type IJoinRoomDTO from 'common/interfaces/IJoinRoomDTO'
import type ILeaveRoomDTO from 'common/interfaces/ILeaveRoomDTO'

interface WebSocketEventTypes {
  message: (message: IAuthMessage) => void
  time: (date: string) => void
}

let service: WebSocketService

export default class WebSocketService {
  private io: Server | null = null
  private emitter: Emitter | null = null
  private pingTimer: any

  constructor() {
    service = this
  }

  public async start(httpServer: any): Promise<void> {
    this.io = new Server(httpServer, {
      path: '/api/socket',
    })

    await this.initRedisConnection()

    this.io.on('connection', (socket: Socket) => {
      LogService.info('User connected')
      let pingInterval: any

      socket.on('join-room', async (payload: IJoinRoomDTO, callback: Function) => {
        // TODO: Authenticate message.
        await socket.join(`room-${payload.chatId}`)
        callback()
      })

      socket.on('leave-room', async (payload: ILeaveRoomDTO, callback: Function) => {
        // TODO: Authenticate message.
        await socket.leave(`room-${payload.chatId}`)
        callback()
      })

      socket.on('disconnect', () => {
        clearInterval(pingInterval)
      })

      pingInterval = setInterval(() => {
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
      LogService.info('Connected to Redis server')
    } catch (error) {
      LogService.error('Failed to connect to Redis server')
    }
  }

  public sendMessage(message: IMessage) {
    this.emitter?.to(`room-${message.chatId}`).emit('message', message)
  }
}

export const useWebSocketService = (): WebSocketService => {
  if (!service) {
    throw new Error('WebSocketService singleton not instantiated.')
  }
  return service
}
