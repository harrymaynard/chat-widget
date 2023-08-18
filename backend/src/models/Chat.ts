import { DataTypes, Model } from 'sequelize'

export default class Chat extends Model {
  declare chatId: number
}

export const tableSchema = {
  chatId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE(3),
  },
  updatedAt: {
    type: DataTypes.DATE(3),
  },
}
