import LogService from './services/LogService'
import WebServerService from './services/WebServerService'
import WebSocketService from './services/WebSocketService'

class ServiceManager {
  private webServerService: WebServerService
  private webSocketService: WebSocketService

  constructor() {
    this.webServerService = new WebServerService()
    this.webSocketService = new WebSocketService()
  }

  public async start(): Promise<void> {
    try {
      const httpServer = await this.webServerService.start()
      await this.webSocketService.start(httpServer)
      httpServer.listen(process.env.WEB_SERVER_PORT)
    } catch (error) {
      LogService.error('Failed to start server.')
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.webServerService.stop()
      await this.webSocketService.stop()
    } catch (error) {
      LogService.error('Failed to safely stop server')
    }
  }

  public async restart(): Promise<void> {
    await this.stop()
    await this.start()
  }
}

export default new ServiceManager()
