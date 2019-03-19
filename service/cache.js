const redis = require('redis')

class CacheService {
  async zrevrange(key, start, end) {
    const {redis} = this.app
    return await redis.zrevrange(key, start, end, 'WITHSCORES')
  }

  async zincrby(key, increment, value) {
    const {redis} = this.app
    await redis.zincrby(key, increment, value)
  }

  async getset(key, fn, options = {}) {
    const {redis} = this.app
    const result = await redis.get(key)
    if (result) {
      return JSON.parse(result)
    }
    const resultFromFn = await fn()
    redis.set(key, JSON.stringify(resultFromFn), 'EX', options.ttl)
    return resultFromFn
  }
}

module.exports = new CacheService()
