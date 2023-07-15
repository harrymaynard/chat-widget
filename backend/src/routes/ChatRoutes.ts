import logService from '../services/LogService'

export const getMessages = async (request: any, response: any) => {
  try {
    response.send({
      message: 'hello world!'
    })
  } catch (error) {
    logService.error('Something bad happened.')
    response.status(500)
    response.end()
  }
}
