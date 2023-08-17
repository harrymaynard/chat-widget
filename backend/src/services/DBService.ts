import { Sequelize } from 'sequelize'
import LogService from './LogService'
import User, { tableSchema as userTableSchema } from '../models/User'
import UserType from 'common/enums/UserType'

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
    this.sequelize = new Sequelize({
      dialect: 'mysql',
      host: this.config.dbHost,
      username: this.config.dbUsername,
      password: this.config.dbPassword,
      database: this.config.dbName,
    })
    let canConnectToDB: boolean = false

    try {
      await this.sequelize.authenticate()
      canConnectToDB = true
      LogService.info('Connected to MySQL database.')
    } catch (error: any) {
      LogService.error('Unable to connect to the database.')
      LogService.error(error.toString())
    }

    if (canConnectToDB) {
      try {
        await this.setupTables()
        LogService.info('Setup DB successfully.')
      } catch (error: any) {
        LogService.error('Error initializing DB tables.')
        LogService.error(error.toString())
      }
    }

    return Promise.resolve()
  }

  public async stop() {
    return Promise.resolve()
  }

  private async setupTables() {
    // Setup User models, database mappings, and mock data.
    User.init(userTableSchema, { sequelize: this.sequelize })
    await User.sync({ force: true })
    await User.create({
      name: 'Sally',
      userType: UserType.Admin,
    })
    await User.create({
      name: 'John',
      userType: UserType.Member,
    })
    await User.create({
      name: 'Emily',
      userType: UserType.Member,
    })
  }
}

export const useDB = () => {
  if (!service) {
    throw new Error('DBService hasn\' been instantiated.')
  }
  return service
}
