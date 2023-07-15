import ip from 'ip'
import ServiceManager from './ServiceManager'

export default class Application {
  async start(): Promise<void> {
    const networkIPAddress = await this.getNetworkIPAddress()
    await ServiceManager.start()

    console.log('Started server.')
    console.log('************************************')
    console.log(`Local: http://localhost:${process.env.WEB_SERVER_PORT}`)
    console.log(`Network: http://${networkIPAddress}:${process.env.WEB_SERVER_PORT}`)
    console.log('************************************')

    return new Promise(() => {
      setInterval(() => {}, 1000)
    });
  }

  async stop(): Promise<void> {
    await ServiceManager.stop()
    console.log('Successfully shutdown server.')
  }

  private getNetworkIPAddress(): Promise<string> {
    return new Promise((resolve) => {
      const address = ip.address()
      resolve(address)
    })
  }
}
