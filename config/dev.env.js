var merge = require('webpack-merge')
var devEnv = require('./factory/test')
module.exports = merge(devEnv, {
  NODE_ENV: '"development"'
})
