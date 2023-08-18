import { DataTypes, Model, Sequelize } from 'sequelize'

export default class Message extends Model {
  declare messageId: number
  declare userId: number
  declare chatId: number
  declare text: string
}

export const tableSchema = {
  messageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  chatId: {
    type: DataTypes.INTEGER,
  },
  text: {
    type: DataTypes.TEXT,
  },
  createdAt: {
    type: DataTypes.DATE(3),
  },
  updatedAt: {
    type: DataTypes.DATE(3),
  },
}
