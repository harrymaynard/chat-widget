import UserType from '../enums/UserType'

export default interface IUser {
  userId: number
  name: string
  userType: UserType
}
