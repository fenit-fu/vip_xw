const config = require('config')
const _ = require('lodash')
const rp = require('request-promise')
const NEW_MOVIES = require('../constants/newmovies')

class HomeService {
  async getMovieDetailByUuid(uuid) {
    if (uuid === '1')
      return {
        data: NEW_MOVIES.MANUAL[0],
        type: 'film'
      }
    if (uuid === '2')
      return {
        data: NEW_MOVIES.MANUAL[1],
        type: 'film'
      }
    if (uuid === '3')
      return {
        data: NEW_MOVIES.MANUAL[2],
        type: 'film'
      }
    if (uuid === '4')
      return {
        data: NEW_MOVIES.MANUAL[3],
        type: 'film'
      }
    if (uuid === '5')
      return {
        data: NEW_MOVIES.MANUAL[4],
        type: 'film'
      }
    if (uuid === '6')
      return {
        data: NEW_MOVIES.MANUAL[5],
        type: 'film'
      }
    try {
      const filmOptions = {
        url: `${config.get('reptileZxMovieUrl.wangzherongyao.filmDetail')}` + uuid + '?uuid=' + uuid,
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
        && (filmResult.url).indexOf('v.shinegobaby.com') === -1
        && (filmResult.url).indexOf('v.tian1886.com') === -1) {
        return {
          data: filmResult,
          type: 'film'
        }
      }
      else {
        return '此视频以后台记录保存即将上架'
      }
    }
    catch (e) {
      const teleplayOptions = {
        url: `${config.get('reptileZxMovieUrl.wangzherongyao.teleplayDetail')}` + uuid + '?uuid=' + uuid,
        method: 'GET',
        json: true
      }
      const teleplayResult = await rp(teleplayOptions)

      teleplayResult.teleplayLinkDtoList = _.filter(teleplayResult.teleplayLinkDtoList, (item) => {
        return (item.url).indexOf('v.yimohui2017.com') === -1
          && (item.url).indexOf('v.sanyiwangluo.com') === -1
          && (item.url).indexOf('v.lyerhuo.com') === -1
          && (item.url).indexOf('v.ynkqx.com') === -1
          && (item.url).indexOf('v.zhubodasai.com') === -1
          && (item.url).indexOf('v.aimushang.com') === -1
          && (item.url).indexOf('v.shinegobaby.com') === -1
          && (item.url).indexOf('v.tian1886.com') === -1
          && (item.url).indexOf('v2.aimushang.com') === -1
          && (item.url).indexOf('v.gmitking.com') === -1
      })

      return {
        data: teleplayResult,
        type: 'teleplay'
      }
    }
  }
}

module.exports = new HomeService()
