require('express-async-errors')
const rp = require('request-promise')
const config = require('config')
const carouseModel = require('../mongoose').carouse

class IndexController {
  async getCarouselList(req, res) {
    //res.sendOk(await carouseModel.find())
  }

  async getNewMovieList(req, res) {
    const options = {
      url: config.get('reptileZxMovieUrl.wangzherongyao'),
      method: 'GET',
      json: true
    }
    res.sendOk(await rp(options))
  }
}

module.exports = new IndexController()
