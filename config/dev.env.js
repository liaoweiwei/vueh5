var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"devel"',
  BASE_API: '"https://sit-api.baipu.com"',
  BASE_URL: '"https://sit-m.baipu.com"',
  LOCALE: '"zh"'
})
