import logService from '../services/LogService'
import Message from '../models/Message'
import User from '../models/User'
import Chat from '../models/Chat'
import LogService from '../services/LogService'

export const getChatById = async (request: any, response: any) => {
  const chatId = parseInt(request.params.chatId)
  
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

    // Query for chat messages.
    const messagesResult = await Message.findAll({
      where: {
        chatId,
      },
      order: [
        ['createdAt', 'ASC'],
      ],
    })
    const messages = messagesResult.map(item => ({
      ...item.dataValues
    }))
    
    // Create list of unique userIds
    const chatUserIds: Array<number> = []
    messages.forEach(item => !chatUserIds.includes(item.userId) ? chatUserIds.push(item.userId) : null)

    // Query for chat participants.
    const usersResult = await User.findAll({
      where: {
        userId: chatUserIds
      },
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
