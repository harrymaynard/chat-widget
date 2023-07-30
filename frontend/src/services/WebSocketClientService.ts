import { type Socket, io } from 'socket.io-client'

export class WebSocketClientService {
  public socket: Socket | null = null

  public async connect() {
    this.socket = io('ws://localhost:8080', {
      path: '/api/socket',
      transports: ['websocket'],
      reconnectionDelayMax: 10000,
    })

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
