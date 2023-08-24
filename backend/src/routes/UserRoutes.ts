import User from '../models/User'
import ChatParticipation from '../models/ChatParticipation'
import Message from '../models/Message'
import LogService from '../services/LogService'
import type ILoginResponseDTO from 'common/interfaces/ILoginResponseDTO'
import type ILoginRequestDTO from 'common/interfaces/ILoginRequestDTO'
import UserType from 'common/enums/UserType'
import Chat from '../models/Chat'

export const postLogin = async (request: any, response: any) => {
  const requestPayload = request.body as ILoginRequestDTO

  try {
    // Query for existing user.
    let userResult = await User.findOne({
      where: {
        name: requestPayload.name,
      },
    })
    if (!userResult) {
      userResult = await User.create({
        name: requestPayload.name,
        userType: requestPayload.userType || UserType.Member,
      })
    }

    // Query for chatId.
    let chatId: number | null = null
    if (userResult.dataValues.userType === UserType.Member) {
      let messageResult = await Message.findOne({
        where: {
          userId: userResult.dataValues.userId,
        },
      })
      if (messageResult) {
        chatId = messageResult.dataValues.chatId
      } else {
        const chatResult = await Chat.create({})
        chatId = chatResult.dataValues.chatId
      }
    }
    
    // Create response payload.
    const payload: ILoginResponseDTO = {
      userId: userResult.dataValues.userId,
      name: userResult.dataValues.name,
      userType: userResult.dataValues.userType,
      chatId,
    }

    // Send response.
    response.send(payload)
  } catch (error) {
    LogService.error('getChats REST endpoint failed.')
    console.error(error)
    response.status(500)
    response.end()
  }
}
