require('express-async-errors')
const rp = require('request-promise')
const config = require('config')
const carouseModel = require('../mongoose').carouse

class IndexController {
  async getCarouselList(req, res) {
    const result = await carouseModel.find()
    res.sendOk(result)
  }

  async getNewMovieList(req, res) {
    const type = req.query.type || 'ZX'
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyao')}${type}`,
      method: 'GET',
      json: true
    }
    res.sendOk(await rp(options))
  }

  async getMovieListByName(req, res) {
    const name = (req.query.name).trim() || 'ZX'
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyaoSearch')}` + encodeURIComponent(name),
      method: 'GET',
      json: true
    }
    res.sendOk(await rp(options))
  }

  async getMovieDetailByUuid(req, res) {
    const id = (req.query.uuid).trim()

    try {
      const filmOptions = {
        url: `${config.get('reptileZxMovieUrl.wangzherongyao.filmDetail')}` + id + '?uuid=' + id,
        method: 'GET',
        json: true
      }
      const filmResult = await rp(filmOptions)
      return res.sendOk({
        data: filmResult,
        type: 'film'
      })
    }
    catch (e) {
      const teleplayOptions = {
        url: `${config.get('reptileZxMovieUrl.wangzherongyao.teleplayDetail')}` + id + '?uuid=' + id,
        method: 'GET',
        json: true
      }
      const teleplayResult = await rp(teleplayOptions)
      return res.sendOk({
        data: teleplayResult,
        type: 'teleplay'
      })
    }
  }
}


module.exports = new IndexController()