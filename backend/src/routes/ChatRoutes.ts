import logService from '../services/LogService'
import Message from '../models/Message'
import User from '../models/User'

export const getChatById = async (request: any, response: any) => {
  const chatId = parseInt(request.params.chatId)
  try {
    // Query for chat messages.
    const messagesResult = await Message.findAll({
      where: {
        chatId,
      },
      order: [
        ['createdAt', 'ASC'],
      ]
    })
    const messages = messagesResult.map(item => ({
      ...item.dataValues
    }))
    
    // Query for chat participants.
    const chatUserIds: Array<number> = []
    messages.forEach(item => {
      if (!chatUserIds.includes(item.userId)) {
        chatUserIds.push(item.userId)
      }
    })
    const usersResult = await User.findAll({
      where: {
        userId: chatUserIds
      }
    })
    const users = usersResult.map(item => ({
      ...item.dataValues
    }))

    // Create response payload.
    const payload = {
      chatId,
      messages,
      users,
    }
    response.send(payload)
  } catch (error) {
    logService.error('Something bad happened.')
    response.status(500)
    response.end()
  }
}
