import logService from '../services/LogService'
import Message from '../models/Message'
import Chat from '../models/Chat'
import User from '../models/User'
import ChatParticipation from '../models/ChatParticipation'
import LogService from '../services/LogService'
import { useWebSocketService } from '../services/WebSocketService'
import { useDB } from '../services/DBService'

export const postMessage = async (request: any, response: any) => {
  const webSocketService = useWebSocketService()
  const db = useDB()
  const chatId = parseInt(request.params.chatId)
  const requestPayload = request.body

  const transaction = await db.getSequelize().transaction()
  
  try {
    // Query for valid chatId.
    const chatResult = await Chat.findOne({
      where: {
        chatId,
      },
    })
    if (!chatResult) {
      response.status(404).end()
      LogService.warn(`Invalid chatId provided: ${chatId}`)
      return
    }

    // Query for valid userId.
    const userResult = await User.findOne({
      where: {
        userId: requestPayload.userId,
      },
    })
    if (!userResult) {
      response.status(404).end()
      LogService.warn(`Invalid userId provided: ${requestPayload.userId}`)
      return
    }

    const participationResult = await ChatParticipation.findOne({
      where: {
        chatId: chatResult.dataValues.chatId,
        userId: userResult.dataValues.userId,
      },
    })
    if (!participationResult) {
      await ChatParticipation.create({
        chatId: chatResult.dataValues.chatId,
        userId: userResult.dataValues.userId,
      })
    }

    // Insert chat message to DB.
    const messageResult = await Message.create({
      chatId,
      userId: requestPayload.userId,
      text: requestPayload.text,
    })

    // Send message to listening participants.
    webSocketService.sendMessage({
      chatId,
      messageId: messageResult.dataValues.messageId,
      userId: requestPayload.userId,
      userType: userResult.dataValues.userType,
      name: userResult.dataValues.userName,
      text: messageResult.dataValues.text,
      createdAt: messageResult.dataValues.createdAt,
    })

    await transaction.commit()

    // Return newly created message.
    response.send(messageResult.dataValues)
  } catch (error) {
    try {
      await transaction.rollback()
    } catch (error) {
      logService.error('Rollback failed')
    }
    logService.error('Something bad happened.')
    response.status(500)
    response.end()
  }
}
