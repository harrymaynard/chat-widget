import { DataTypes, Model } from 'sequelize'
import UserType from 'common/enums/UserType'

export default class User extends Model {
  declare id: number
  declare name: string
  declare userType: UserType
}

export const tableSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.TEXT,
  },
  userType: {
    type: DataTypes.STRING,
  }
}
