const redis = require('redis')
const config = require('config')
const client = redis.createClient(config.get('redisOption.port'), config.get('redisOption.host'))
client.auth(config.get('redisOption.password'))
client.on('connect', function () {
  console.log('connect success')
})
module.exports = client


