import logService from '../services/LogService'
import Message from '../models/Message'
import Chat from '../models/Chat'
import User from '../models/User'
import LogService from '../services/LogService'
import { useWebSocketService } from '../services/WebSocketService'

export const postMessage = async (request: any, response: any) => {
  const webSocketService = useWebSocketService()
  const chatId = parseInt(request.params.chatId)
  const requestPayload = request.body
  
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

    // Query for valid chatId.
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

    // Insert chat message to DB.
    const messageResult = await Message.create({
      chatId,
      userId: requestPayload.userId,
      text: requestPayload.text,
    })
    
    // Return newly created message.
    response.send(messageResult.dataValues)

    // Send message to listening participants.
    webSocketService.sendMessage({
      chatId,
      messageId: messageResult.dataValues.messageId,
      userId: requestPayload.userId,
      userType: userResult.dataValues.userType,
      name: userResult.dataValues.userName,
      text: messageResult.dataValues.text,
      time: messageResult.dataValues.createdAt,
    })
  } catch (error) {
    logService.error('Something bad happened.')
    response.status(500)
    response.end()
  }
}
