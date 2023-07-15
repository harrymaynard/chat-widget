// @ts-ignore
import { compareVersions } from 'compare-versions'
import { config as dotEnvConfig } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { loadJSON } from './src/helpers/LoaderHelper'
import Application from './src/Application'

const packageJSON = loadJSON('./package.json', import.meta.url)

const init = () => {
  validateNodeVersion()
  loadConfig()

  const application = new Application()
  application.start()

  process.on('SIGINT', async () => {
    console.log('')
    await application.stop()
    process.exit()
  });
};

const validateNodeVersion = () => {
  const minimumNodeVersion = packageJSON.engines.node.replace('>=', '')
  const currentNodeVersion = process.version.replace('v', '')
  
  if (compareVersions(currentNodeVersion, minimumNodeVersion) < 0) {
    console.log('Minimum NodeJS version is:', minimumNodeVersion)
    console.log('Current NodeJS version is:', currentNodeVersion)
    process.exit(1)
  }
}

const loadConfig = () => {
  const configFileName = '.env'
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const config = dotEnvConfig({ path: __dirname + `/./${configFileName}`})
  
  if (config.error) {
    console.error(`could not read '${configFileName}' config file.`)
    process.exit(1)
  }
}

init()
