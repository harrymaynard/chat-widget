class LogService {
  logger: any
  winston: any

  constructor() {
    this.winston = require('winston')

    this.createLogger()
  }

  private createLogger(): void {
    const fileName = process.env.LOG_FILE_NAME ? process.env.LOG_FILE_NAME : 'logs/server.log'

    this.logger = this.winston.createLogger({
      level: process.env.LOG_LEVEL,
      transports: [
        new this.winston.transports.Console({
          format: this.winston.format.combine(
            this.winston.format.colorize(),
            this.winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            this.winston.format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
          )
        }),
        new this.winston.transports.File({
          filename: fileName,
          format: this.winston.format.combine(
            this.winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            this.winston.format.json()
          )
        })
      ]
    })
  }

  public error(message: string, ...args: any): void {
    this.logger.log({
      level: 'error',
      message,
      args,
    })
  }

  public warn(message: string): void {
    this.logger.log({
      level: 'warn',
      message,
    })
  }

  public info(message: string): void {
    this.logger.log({
      level: 'info',
      message,
    })
  }

  public debug(message: string): void {
    this.logger.log({
      level: 'debug',
      message,
    })
  }

  public http(message: string): void {
    this.logger.log({
      level: 'http',
      message,
    })
  }
}

module.exports = new LogService()
