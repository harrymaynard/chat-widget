import logService from '../services/LogService'
import Message from '../models/Message'
import User from '../models/User'
import Chat from '../models/Chat'
import ChatParticipation from '../models/ChatParticipation'
import LogService from '../services/LogService'
import type IChatsDTO from 'common/interfaces/IChatsDTO'

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
    let messages = messagesResult.map(item => ({
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

    // Add "name" to message objects.
    messages = messages.map(message => ({
      ...message,
      name: users.find(user => user.userId === message.userId)?.name || ''
    }))

    // Create response payload.
    const payload = {
      chatId,
      messages,
      users,
    }
    response.send(payload)
  } catch (error) {
    logService.error('getChatById REST endpoint failed.')
    response.status(500)
    response.end()
  }
}

export const getChats = async (request: any, response: any) => {
  try {
    const payload: IChatsDTO = {
      chats: []
    }
    // Query for all chat conversations.
    // TODO: Current implementation is definitely sub-optimal. Definitely needs improvement.
    const chatResult = await Chat.findAll()
    for (let i=0; i<chatResult.length; i++) {
      const chat = chatResult[i].dataValues

      const participants = await ChatParticipation.findAll({
        where: {
          chatId: chat.chatId,
        },
      })
      const participantNames: Array<string> = []
      const participantUserPromises: Array<Promise<void>> = []

      participants.forEach(item => {
        participantUserPromises.push(new Promise<void>(async (resolve, reject) => {
          try {
            const participantUser = await User.findOne({
              where: {
                userId: item.dataValues.userId,
              },
            })
            participantNames.push(participantUser?.dataValues.name)
            resolve()
          } catch (error) {
            reject()
          }
        }))
      })
      await Promise.all(participantUserPromises)

      payload.chats.push({
        chatId: chat.chatId,
        participantNames,
        createdAt: chat.createdAt,
      })
    }
    
    // Send response.
    response.send(payload)
  } catch (error) {
    logService.error('getChats REST endpoint failed.')
    console.error(error)
    response.status(500)
    response.end()
  }
}
