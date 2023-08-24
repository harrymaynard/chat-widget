import UserType from 'common/enums/UserType'

export default interface ILoginRequestDTO {
  name: string
  userType?: UserType
}
