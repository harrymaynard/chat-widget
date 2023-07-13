module.exports = (function() {
  const logService = require('../services/LogService')

  const getMessages = async (request: any, response: any) => {
    try {
      response.send({
        message: 'hello world!'
      })
    } catch (error) {
      logService.error('Some bad happened.')
      response.status(500)
      response.end()
    }
  }

  return {
    getMessages,
  }
})()
