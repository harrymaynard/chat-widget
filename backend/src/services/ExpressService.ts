module.exports = (function() {
  const express = require('express')
  const path = require('path')
  const http = require('http')

  const chatRoutes = require('../routes/ChatRoutes')
  const logService = require('./LogService')

  class ExpressService {
    private app: any
    private httpServer: any

    public start() {
      this.app = express()
      
      // Make request JSON payload available for all API endpoints.
      this.app.use(express.json())

      // Have Node serve the files for our built frontend app
      this.app.use(express.static(path.resolve(__dirname, '../../../frontend/dist')))

      // Set CORS headers.
      this.app.use((req: any, res: any, next: Function) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        res.header('Access-Control-Allow-Credentials', true)
        return next()
      })

      this.app.get('/api/chat/getMessages', chatRoutes.getMessages)

      // All other GET requests not handled before will return the frontend app
      // this.app.get('*', (req: any, res: any) => {
      //   res.sendFile(path.resolve(__dirname, '../../../frontend/dist', 'index.html'))
      // })

      this.httpServer = http.createServer(this.app)
      // Start express server.
      this.httpServer.listen(process.env.WEB_SERVER_PORT)
      logService.info('Started web server')
    }

    public async stop() {
      logService.info('stopped web server')
    }
  }

  return ExpressService
})()
