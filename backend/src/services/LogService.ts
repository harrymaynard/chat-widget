import winston from 'winston'

class LogService {
  logger: any

  constructor() {
    this.createLogger()
  }

  private createLogger(): void {
    const fileName = process.env.LOG_FILE_NAME ? process.env.LOG_FILE_NAME : 'logs/server.log'

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.printf((info: any) => `${info.timestamp} ${info.level}: ${info.message}`)
          )
        }),
        new winston.transports.File({
          filename: fileName,
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.json()
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

export default new LogService()
