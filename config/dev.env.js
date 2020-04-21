var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"devel"',
  BASE_API: '""',
  BASE_URL: '""',
  LOCALE: '"zh"'
})
