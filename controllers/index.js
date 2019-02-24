require('express-async-errors')
const rp = require('request-promise')
const _ = require('lodash')
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
    })
    res.sendOk(filterResult)
    // res.sendOk(_.map(filterResult, function (item) {
    //   return {
    //     uuid: item.uuid,
    //     name: item.name,
    //     url: item.url
    //   }
    // }))
  }

  async getMovieListByName(req, res) {
    const name = (req.query.name)
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyao.search')}` + encodeURIComponent(name),
      timeout: 1000 * 5,
      method: 'GET',
      json:
          true
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
      if ((filmResult.url).indexOf('http://v.yimohui2017.com') === -1
          && (filmResult.url).indexOf('http://v.sanyiwangluo.com') === -1
          && (filmResult.url).indexOf('v.lyerhuo.com') === -1
          && (filmResult.url).indexOf('v.ynkqx.com') === -1
          && (filmResult.url).indexOf('v.zhubodasai.com') === -1
          && (filmResult.url).indexOf('v.aimushang.com') === -1
          && (filmResult.url).indexOf('v.shinegobaby.com') === -1) {
        return res.sendOk({
          data: filmResult,
          type: 'film'
        })
      }
      else {
        return res.sendOk('此视频以后台记录保存即将上架')
      }
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