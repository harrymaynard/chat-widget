import { type Socket, Manager } from 'socket.io-client'

const SOCKET_API_ENDPOINT: string = '/api/socket'

export class WebSocketClientService {
  public socket: Socket | null = null
  private socketManager: Manager | null = null

  public async connect() {
    this.socketManager = new Manager('ws://localhost:8080', {
      path: SOCKET_API_ENDPOINT,
      transports: ['websocket'],
      reconnectionDelayMax: 10000,
      autoConnect: false,
    })
    this.socket = this.socketManager.socket('/')

    this.socket.on('connect', () => {
      console.log('connected to websocket endpoint')
    })

    this.socket.on('disconnect', (reason) => {
      console.log('disconnected from websocket endpoint')

      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket?.connect()
      }
      // else the socket will automatically try to reconnect
    })

    return new Promise((resolve, reject) => {
      this.socketManager?.connect((error) => {
        if (error) {
          reject()
        } else {
          this.socket?.connect()
          resolve(null)
        }
      })
    })
  }

  public async disconnect() {
    this.socket?.disconnect()
  }
}

let service: WebSocketClientService

export const useWebSocketClientService = (): WebSocketClientService => {
  if (!service) {
    service = new WebSocketClientService()
  }
  return service
}
