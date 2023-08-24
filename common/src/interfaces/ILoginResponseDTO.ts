import UserType from 'common/enums/UserType'

export default interface ILoginResponseDTO {
  userId: number
  userType: UserType
  name: string
  chatId?: number | null
}
