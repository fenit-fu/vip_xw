require('express-async-errors')
const rp = require('request-promise')
const config = require('config')
const redisCache = require('../service/cache')
const util = require('../constants/util')

class ViewRanksController {
  async getViewRank(req, res) {
    const typeIndex = req.query.typeIndex || 2
    const options = {
      url: `${config.get('reptileZxMovieUrl.xiaoxiaoys.viewRankList')}${typeIndex}-0-0-0-0-0-1`,
      method: 'GET',
      gzip: true,
      json: true
    }
    const result = await redisCache.getset(`${typeIndex}viewRanks`, async function () {
      return await rp(options)
    }, {ttl: 3600 * 24 * 1})
    res.sendOk(util._buildViewRanksResult(result))
  }
}


module.exports = new ViewRanksController()
