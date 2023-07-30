import { Server, Socket } from 'socket.io'

export default class WebSocketService {
  private io: any

  constructor() {}

  public async start(httpServer: any) {
    this.io = new Server(httpServer, {
      path: '/api/socket',
    })

    this.io.on('connection', (socket: Socket) => {
      console.log('a user connected')
    })
  }

  public async stop() {}
}
