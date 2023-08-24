import { type Socket, Manager } from 'socket.io-client'
import { EventEmitter } from 'events'
import type IMessage from '../interfaces/IMessage'
import type IJoinRoomDTO from 'common/interfaces/IJoinRoomDTO'
import type ILeaveRoomDTO from 'common/interfaces/ILeaveRoomDTO'

interface IConfig {
  chatId?: number
  path?: string
}

const DEFAULT_CHAT_ID: number = 0
const DEFAULT_PATH: string = '/api/socket'

export class WebSocketClientService {
  public eventEmitter: EventEmitter
  public socket: Socket | null = null
  private socketManager: Manager | null = null
  private path: string
  private chatId: number
  private connected: boolean = false
  
  constructor(config: IConfig = {}) {
    this.eventEmitter = new EventEmitter()
    this.chatId = typeof config.chatId === 'number' ? config.chatId : DEFAULT_CHAT_ID
    this.path = typeof config.path === 'string' ? config.path : DEFAULT_PATH
  }

  public async connect(): Promise<void> {
    this.socketManager = new Manager({
      path: this.path,
      transports: ['websocket'],
      reconnectionDelayMax: 10000,
      autoConnect: false,
    })
    this.socket = this.socketManager.socket('/')

    this.attachListeners(this.socket)

    return new Promise((resolve, reject) => {
      this.socketManager?.connect((error) => {
        if (error) {
          reject()
        } else {
          const connectionCompleteHandler = () => {
            this.socket?.off('connect', connectionCompleteHandler)  
            resolve()
          }
          this.socket?.on('connect', connectionCompleteHandler)
          this.socket?.connect()
        }
      })
    })
  }

  public async disconnect() {
    this.socket?.disconnect()
  }

  private attachListeners(socket: Socket) {
    // Listen for connection event.
    socket.on('connect', async () => {
      const payload: IJoinRoomDTO = {
        chatId: this.chatId
      }
      this.socket?.emit(`join-room`, payload, () => {
        this.connected = true
        this.eventEmitter.emit('connect')
        console.log('connected to websocket endpoint')
      })
    })

    // Listen for websocket disconnect events.
    socket.on('disconnect', (reason: string) => {
      this.connected = false
      this.eventEmitter.emit('disconnect')
      console.log('disconnected from websocket endpoint')

      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, manually attempting to reconnect.
        socket?.connect()
      }
      // else the socket will automatically try to reconnect with a time delay.
    })

    // Listen for chat messages.
    socket.on('message', (message: IMessage, callback: () => void) => {
      if (callback) {
        callback()
      }
      this.eventEmitter.emit('message', message)
    })

    // Listen for chat messages.
    socket.on('ping', (time: string, callback: () => void) => {
      if (typeof callback === 'function') {
        callback()
      }
      this.eventEmitter.emit('ping', time)
    })
  }

  public isConnected(): boolean {
    return this.connected
  }

  public on(eventName: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.on(eventName, callback)
  }

  public off(eventName: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.off(eventName, callback)
  }

  public joinRoom(chatId: number) {
    const payload: IJoinRoomDTO = {
      chatId,
    }
    const time = performance.now()
    this.socket?.emit(`join-room`, payload, (response: any) => {
      this.eventEmitter.emit('join-room', response)
      console.log('joined room. Time:', performance.now() - time)
    })
  }

  public leaveRoom(chatId: number) {
    const payload: ILeaveRoomDTO = {
      chatId,
    }
    this.socket?.emit(`leave-room`, payload, (response: any) => {
      this.eventEmitter.emit('leave-room', response)
    })
  }
}

let service: WebSocketClientService

export const useWebSocketClientService = (config: IConfig = {}): WebSocketClientService => {
  if (!service) {
    service = new WebSocketClientService(config)
  }
  return service
}
