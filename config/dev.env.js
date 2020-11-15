'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENDPOINT: '"https://localhost:44300"',
  // API_ENDPOINT: '"http://localhost:53130"',
  // API_ENDPOINT: '"http://localhost:8080/"',
})
