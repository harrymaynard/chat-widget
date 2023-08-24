import express from 'express'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'
import logService from './LogService'
import { getChatById, getChats } from '../routes/ChatRoutes'
import { postMessage } from '../routes/MessageRoutes'
import { postLogin } from '../routes/UserRoutes'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_BASE_PATH: string = '/api'

export default class ExpressService {
  private app: any
  private httpServer: any

  public async start() {
    this.app = express()
    
    // Make request JSON payload available for all API endpoints.
    this.app.use(express.json())

    // Have Node serve the files for our built frontend app
    this.app.use(express.static(path.resolve(__dirname, '../../../frontend/dist')))

    // Set CORS headers.
    this.app.use((request: any, response: any, next: Function) => {
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
      response.setHeader('Access-Control-Allow-Credentials', true)
      return next()
    })

    this.app.get(`${API_BASE_PATH}/chats`, getChats)
    this.app.get(`${API_BASE_PATH}/chat/:chatId`, getChatById)
    this.app.post(`${API_BASE_PATH}/chat/:chatId/message`, postMessage)
    this.app.post(`${API_BASE_PATH}/user`, postLogin)

    // All other GET requests not handled before will return the frontend app
    // this.app.get('*', (req: any, res: any) => {
    //   res.sendFile(path.resolve(__dirname, '../../../frontend/dist', 'index.html'))
    // })

    // Create and start express server.
    this.httpServer = http.createServer(this.app)
    
    logService.info('Started web server')

    return this.httpServer
  }

  public async stop() {
    logService.info('Stopped web server')
  }
}

