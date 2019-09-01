require('express-async-errors')
const rp = require('request-promise')
const config = require('config')
const carouseModel = require('../mongoose').carouse
const carouseService = require('../service/index')
const redisCache = require('../service/cache')
const util = require('../constants/util')

class IndexController {
  async getCarouselList(req, res) {
    const result = await carouseModel.find()
    res.sendOk(result)
  }

  async getNewMovieList(req, res) {
    const options = {
      url: `${config.get('reptileZxMovieUrl.xiaoxiaoys.list')}`,
      method: 'GET',
      timeout: 1000 * 5,
      gzip: true,
      json: true
    }
    const result = await redisCache.getset('slideAndHot', async function () {
      return await rp(options)
    }, {ttl: 3600 * 24 * 2})

    res.sendOk(util._buildHomePageResult(result))
  }

  async getMovieListByName(req, res) {
    const name = (req.query.name)
    const options = {
      url: `${config.get('reptileZxMovieUrl.xiaoxiaoys.seach')}` + encodeURIComponent(name),
      timeout: 1000 * 5,
      gzip: true,
      method: 'GET',
      json: true
    }
    const result = await rp(options)
    res.sendOk(util._buildSeachListResult(result))
  }

  async getMovieDetailByUuid(req, res) {
    const id = req.query.uuid || 47672
    const playIndex = req.query.playIndex || 1
    const result = await carouseService.getMovieDetailByUuid(id)

    res.sendOk(await util._buildDetailResult(result, playIndex))
  }
}


module.exports = new IndexController()
