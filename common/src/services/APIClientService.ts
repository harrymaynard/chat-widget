import axios, { AxiosResponse } from 'axios'
import IMessage from 'common/interfaces/IMessage'
import type IChatsDTO from 'common/interfaces/IChatsDTO'
import type IChat from 'common/interfaces/IChat'
import type ILoginRequestDTO from 'common/interfaces/ILoginRequestDTO'
import ILoginResponseDTO from 'common/interfaces/ILoginResponseDTO'

const API_BASE_PATH: string = '/api'

class APIClientService {
  getChats(): Promise<AxiosResponse<IChatsDTO>> {
    return axios.get<IChatsDTO>(`${API_BASE_PATH}/chats`)
  }
  
  getChatById(chatId: number): Promise<AxiosResponse<IChat>> {
    return axios.get<IChat>(`${API_BASE_PATH}/chat/${chatId}`)
  }

  postMessage(message: IMessage): Promise<AxiosResponse<IMessage>> {
    return axios.post<IMessage>(`${API_BASE_PATH}/chat/${message.chatId}/message`, message)
  }

  postLogin(payload: ILoginRequestDTO) {
    return axios.post<ILoginResponseDTO>(`${API_BASE_PATH}/user`, payload)
  }
}

let service: APIClientService

export const useAPIClientService = () => {
  if (!service) {
    service = new APIClientService()
  }
  return service
}
