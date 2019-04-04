require('express-async-errors')
const rp = require('request-promise')
const _ = require('lodash')
const config = require('config')
const carouseModel = require('../mongoose').carouse
const carouseService = require('../service/index')
const redisCache = require('../service/cache')
const NEW_MOVIES = require('../constants/newmovies')

class IndexController {
  async getCarouselList(req, res) {
    const result = await carouseModel.find()
    res.sendOk(result)
  }

  async getCinemasMovies(req, res) {
    res.sendOk((_.sortBy(NEW_MOVIES.MANUAL, function (item) {
      return -item.uuid
    })))
  }

  async getNewMovieList(req, res) {
    const type = req.query.type || 'ZX'
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyao.list')}${type}`,
      method: 'GET',
      json: true
    }
    const filterResult = await redisCache.getset(`new_${type}`, async function () {
      const result = await rp(options)
      return _.filter(result, (item) => {
        return (item.url).indexOf('http://v.yimohui2017.com') === -1
          && (item.url).indexOf('http://v.sanyiwangluo.com') === -1
          && (item.url).indexOf('v.lyerhuo.com') === -1
          && (item.url).indexOf('v.ynkqx.com') === -1
          && (item.url).indexOf('v.zhubodasai.com') === -1
          && (item.url).indexOf('v.aimushang.com') === -1
          && (item.url).indexOf('v.shinegobaby.com') === -1
      })
    }, {ttl: 3600 * 24 * 30})
    res.sendOk(filterResult)
  }

  async getMovieListByName(req, res) {
    const name = (req.query.name)
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyao.search')}` + encodeURIComponent(name),
      timeout: 1000 * 5,
      method: 'GET',
      json: true
    }
    res.sendOk(await rp(options))
  }

  async getMovieDetailByUuid(req, res) {
    const id = (req.query.uuid).trim()
    res.sendOk(await carouseService.getMovieDetailByUuid(id))
  }
}


module.exports = new IndexController()
