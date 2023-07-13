module.exports = (function() {
  const ExpressService = require('./services/ExpressService')
  
  class ServiceManager {
    expressService

    constructor() {
      this.expressService = new ExpressService()
    }

    public async start(): Promise<void> {
      await this.expressService.start()
    }

    public async stop(): Promise<void> {
      await this.expressService.stop()
    }

    public async restart(): Promise<void> {
      await this.stop()
      await this.start()
    }
  }
  return new ServiceManager()
})()
