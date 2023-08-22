import { DataTypes, Model } from 'sequelize'

export default class Chat extends Model {
  declare participationId: number
  declare chatId: number
  declare userId: number
}

export const tableSchema = {
  participationId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  chatId: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE(3),
  },
  updatedAt: {
    type: DataTypes.DATE(3),
  },
}
