import LogService from './services/LogService'
import DBService from './services/DBService'
import WebServerService from './services/WebServerService'
import WebSocketService from './services/WebSocketService'

class ServiceManager {
  private dbService: DBService
  private webServerService: WebServerService
  private webSocketService: WebSocketService
  
  constructor() {
    this.dbService = new DBService({
      dbHost: process.env.DB_HOST as string,
      dbUsername: process.env.DB_USERNAME as string,
      dbPassword: process.env.DB_PASSWORD as string,
      dbName: process.env.DB_NAME as string,
    })
    this.webServerService = new WebServerService()
    this.webSocketService = new WebSocketService()
  }

  public async start(): Promise<void> {
    try {
      await this.dbService.start()
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
      await this.dbService.stop()
    } catch (error) {
      LogService.error('Failed to safely stop server')
    }
  }

  public async restart(): Promise<void> {
    await this.stop()
    await this.start()
  }
}

export default ServiceManager
