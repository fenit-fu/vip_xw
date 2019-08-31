const Promise = require('bluebird')
const _ = require('lodash')
const redis = require('../redis')
const NEW_MOVIES = require('../constants/util')


class CacheService {
  async zrevrange(key, start, end) {
    return await redis.zrevrange(key, start, end, 'WITHSCORES')
  }

  async zincrby(key, increment, value) {
    await redis.zincrby(key, increment, value)
  }

  async getset(key, fn, options = {}) {
    const result = await redis_get(key)
    console.log('result=',JSON.stringify(result))
    if (result) {
      return JSON.parse(result)
    }
    const resultFromFn = await fn()
console.log('resultFromFn=',resultFromFn)
    redis.set(key, JSON.stringify(resultFromFn), 'EX', options.ttl)
    return resultFromFn
  }
}

function redis_get(key) {
  return new Promise((resolve, reject) => {
    redis.get(key, (err, val) => {
      if (err)
        return reject(err)
      resolve(val)
    })
  })
}

module.exports = new CacheService()
