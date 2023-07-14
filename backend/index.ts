const init = () => {
  validateNodeVersion()
  loadConfig()

  const Application = require('./src/Application')
  const application = new Application()
  application.start()

  process.on('SIGINT', async () => {
    console.log('')
    await application.stop()
    process.exit()
  });
};

const validateNodeVersion = () => {
  const packageJSON = require('./package.json')
  const compareVersions = require('compare-versions')
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
  const config = require('dotenv').config({ path: __dirname + `/./${configFileName}`})
  
  if (config.error) {
    console.error(`could not read '${configFileName}' config file.`)
    process.exit(1)
  }
}

init()
