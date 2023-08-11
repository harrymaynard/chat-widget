import { type Socket, Manager } from 'socket.io-client'
import { EventEmitter } from 'events'
import type IMessage from '../interfaces/IMessage'

interface IConfig {
  path?: string
}

const DEFAULT_PATH: string = '/api/socket'

export class WebSocketClientService {
  public eventEmitter: EventEmitter
  public socket: Socket | null = null
  private socketManager: Manager | null = null
  private path: string
  
  constructor(config: IConfig = {}) {
    this.eventEmitter = new EventEmitter()
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
    socket.on('connect', () => {
      this.eventEmitter.emit('connect')
      console.log('connected to websocket endpoint')
    })

    // Listen for websocket disconnect events.
    socket.on('disconnect', (reason: string) => {
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
      callback()
      this.eventEmitter.emit('message', message)
    })
  }

  public async sendMessage(message: IMessage) {
    await this.socket?.emitWithAck('message', message)
  }

  public on(eventName: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.on(eventName, callback)
  }

  public off(eventName: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.off(eventName, callback)
  }
}

let service: WebSocketClientService

export const useWebSocketClientService = (config: IConfig = {}): WebSocketClientService => {
  if (!service) {
    service = new WebSocketClientService(config)
  }
  return service
}
