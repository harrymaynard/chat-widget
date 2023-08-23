import { Sequelize } from 'sequelize'
import LogService from './LogService'
import User, { tableSchema as userTableSchema } from '../models/User'
import Chat, { tableSchema as chatTableSchema } from '../models/Chat'
import Message, { tableSchema as messageTableSchema } from '../models/Message'
import ChatParticipation, { tableSchema as chatParticipationTableSchema } from '../models/ChatParticipation'
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
        //console.error(error)
      }
    }

    return Promise.resolve()
  }

  public async stop() {
    return Promise.resolve()
  }

  private async setupTables() {
    // Setup User models and database mappings.
    User.init(userTableSchema, {
      sequelize: this.sequelize,
      tableName: 'Users',
      modelName: 'User',
    })
    Chat.init(chatTableSchema, {
      sequelize: this.sequelize,
      tableName: 'Chats',
      modelName: 'Chat',
    })
    Message.init(messageTableSchema, {
      sequelize: this.sequelize,
      tableName: 'Messages',
      modelName: 'Message',
    })
    ChatParticipation.init(chatParticipationTableSchema, {
      sequelize: this.sequelize,
      tableName: 'ChatParticipations',
      modelName: 'ChatParticipation',
    })

    // Create tables in DB.
    await this.sequelize.sync({
      force: true,
    })
    
    // Create mock data.
    const userSally = await User.create({
      name: 'Sally',
      userType: UserType.Admin,
    })
    const userJohn = await User.create({
      name: 'John',
      userType: UserType.Member,
    })
    await User.create({
      name: 'Emily',
      userType: UserType.Member,
    })
    const chat = await Chat.create({})
    await Message.create({
      chatId: chat.dataValues.chatId,
      userId: userJohn.dataValues.userId,
      text: 'Hi, how do I submit a change of last name?'
    })
    await Message.create({
      chatId: chat.dataValues.chatId,
      userId: userSally.dataValues.userId,
      text: 'I can update that for you. What is your new last name?'
    })
    await ChatParticipation.create({
      chatId: chat.dataValues.chatId,
      userId: userJohn.dataValues.userId,
    })
    await ChatParticipation.create({
      chatId: chat.dataValues.chatId,
      userId: userSally.dataValues.userId,
    })
  }

  public getSequelize(): Sequelize {
    return this.sequelize
  }
}

export const useDB = () => {
  if (!service) {
    throw new Error('DBService hasn\' been instantiated.')
  }
  return service
}
