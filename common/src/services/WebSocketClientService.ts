import { type Socket, Manager } from 'socket.io-client'
import { EventEmitter } from 'events'
import type IMessage from '../interfaces/IMessage'

export class WebSocketClientService {
  public eventEmitter: EventEmitter
  public socket: Socket | null = null
  private socketManager: Manager | null = null
  
  constructor() {
    this.eventEmitter = new EventEmitter()
  }

  public async connect(): Promise<void> {
    this.socketManager = new Manager({
      path: '/api/socket',
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
          this.socket?.connect()

          const connectionCompleteHandler = () => {
            this.socket?.off('connect', connectionCompleteHandler)  
            resolve()
          }
          this.socket?.on('connect', connectionCompleteHandler)
          
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

  public on(eventName: string, callback: (...args: any[]) => void) {
    this.eventEmitter.on(eventName, callback)
  }

  public off(eventName: string, callback: (...args: any[]) => void) {
    this.eventEmitter.off(eventName, callback)
  }
}

let service: WebSocketClientService

export const useWebSocketClientService = (): WebSocketClientService => {
  if (!service) {
    service = new WebSocketClientService()
  }
  return service
}
