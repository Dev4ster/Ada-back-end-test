/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config')
config.testMatch = ['**/*.spec*.{js,ts}']
module.exports = config
