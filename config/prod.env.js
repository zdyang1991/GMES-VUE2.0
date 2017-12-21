var merge = require('webpack-merge')
var proEnv = require('./factory/')
module.exports = merge(proEnv, {
  NODE_ENV: '"production"'
})