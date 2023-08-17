import { Sequelize } from 'sequelize'
import LogService from './LogService'

interface IDBServiceConfig {
  dbHost: string
  dbUsername: string
  dbPassword: string
  dbName: string
}

export let service: DBService

export default class DBService {
  private readonly config: IDBServiceConfig

  private sequelize: any

  constructor(config: IDBServiceConfig) {
    this.config = config
    service = this
  }

  public async start() {
    try {
      this.sequelize = new Sequelize({
        dialect: 'mysql',
        host: this.config.dbHost,
        username: this.config.dbUsername,
        password: this.config.dbPassword,
        database: this.config.dbName,
      })

      await this.sequelize.authenticate()
      LogService.info('Connected to MySQL database')
    } catch (error: any) {
      LogService.error('Unable to connect to the database.')
      LogService.error(error.toString())
    }

    return Promise.resolve()
  }

  public async stop() {
    return Promise.resolve()
  }
}

export const useDB = () => {
  if (!service) {
    throw new Error('DBService hasn\' been instantiated.')
  }
  return service
}
