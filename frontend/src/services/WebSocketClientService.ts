import { type Socket, Manager } from 'socket.io-client'
import { type IMessage } from '@/interfaces/IMessage'

export class WebSocketClientService {
  public socket: Socket | null = null
  private socketManager: Manager | null = null

  public async connect(): Promise<void> {
    this.socketManager = new Manager('ws://localhost:8080', {
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
          resolve()
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
      console.log('connected to websocket endpoint')
    })

    // Listen for websocket disconnect events.
    socket.on('disconnect', (reason: string) => {
      console.log('disconnected from websocket endpoint')

      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, manually attempting to reconnect.
        socket?.connect()
      }
      // else the socket will automatically try to reconnect with a time delay.
    })

    // Listen for chat messages.
    socket.on('message', (message: IMessage) => {
      console.log('hello from server:', message)
    })
  }

  public sendMessage(text: string) {
    this.socket?.emit('message', { text })
  }
}

let service: WebSocketClientService

export const useWebSocketClientService = (): WebSocketClientService => {
  if (!service) {
    service = new WebSocketClientService()
  }
  return service
}
