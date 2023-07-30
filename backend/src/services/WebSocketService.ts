import { Server, type Socket } from 'socket.io'
import { formatISODateTime } from 'common/src/helpers/DateHelper'
import LogService from './LogService'

export default class WebSocketService {
  private io: any

  constructor() {}

  public async start(httpServer: any) {
    this.io = new Server(httpServer, {
      path: '/api/socket',
    })

    this.io.on('connection', (socket: Socket) => {
      LogService.info('User connected')
      
      socket.on('message', (message: any) => {
        socket.emit('message', {
          text: message.text,
          time: formatISODateTime(new Date())
        })
      })
    })
  }

  public async stop() {}
}
