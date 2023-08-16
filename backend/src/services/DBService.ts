import { createConnection } from 'mysql'

interface IDBServiceConfig {
  dbHost: string
  dbUsername: string
  dbPassword: string
  dbName: string
}

export let service: DBService

export default class DBService {
  private readonly config: IDBServiceConfig

  private connection: any

  constructor(config: IDBServiceConfig) {
    this.config = config
    service = this
  }

  public async start() {
    this.connection = createConnection({
      host: this.config.dbHost,
      user: this.config.dbUsername,
      password: this.config.dbPassword,
      database: this.config.dbName
    })

    // TODO: Leverage Sequelize.

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
