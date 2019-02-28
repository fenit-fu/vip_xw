require('express-async-errors')
const rp = require('request-promise')
const _ = require('lodash')
const config = require('config')
const carouseModel = require('../mongoose').carouse
const NEW_MOVIES = require('../constants/newmovies')
const serviceIndex = require('../service/index')

class IndexController {
  async getCarouselList(req, res) {
    const result = await carouseModel.find()
    res.sendOk(result)
  }

  async getCinemasMovies(req, res) {
    res.sendOk(NEW_MOVIES.MANUAL)
  }

  async getNewMovieList(req, res) {
    const type = req.query.type || 'ZX'
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyao.list')}${type}`,
      method: 'GET',
      json: true
    }
    const result = await rp(options)
    const filterResult = _.filter(result, (item) => {
      return (item.url).indexOf('http://v.yimohui2017.com') === -1
        && (item.url).indexOf('http://v.sanyiwangluo.com') === -1
        && (item.url).indexOf('v.lyerhuo.com') === -1
        && (item.url).indexOf('v.ynkqx.com') === -1
        && (item.url).indexOf('v.zhubodasai.com') === -1
        && (item.url).indexOf('v.aimushang.com') === -1
        && (item.url).indexOf('v.shinegobaby.com') === -1
        && (item.url).indexOf('v.tian1886.com') === -1
    })
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
    const result = await serviceIndex.getMovieDetailByUuid(id)
    res.sendOk(result)
  }
}


module.exports = new IndexController()