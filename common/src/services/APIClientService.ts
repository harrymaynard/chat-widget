import axios from 'axios'
import IMessage from 'common/interfaces/IMessage'

const API_BASE_PATH: string = '/api'

class APIClientService {
  getChatById(chatId: number) {
    return axios.get(`${API_BASE_PATH}/chat/${chatId}`)
  }

  postMessage(message: IMessage) {
    return axios.post<IMessage>(`${API_BASE_PATH}/chat/${message.chatId}/message`, message)
  }
}

let service: APIClientService

export const useAPIClientService = () => {
  if (!service) {
    service = new APIClientService()
  }
  return service
}
