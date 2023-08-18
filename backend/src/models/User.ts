import { DataTypes, Model } from 'sequelize'
import UserType from 'common/enums/UserType'

export default class User extends Model {
  declare userId: number
  declare name: string
  declare userType: UserType
}

export const tableSchema = {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  userType: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE(3),
  },
  updatedAt: {
    type: DataTypes.DATE(3),
  },
}
