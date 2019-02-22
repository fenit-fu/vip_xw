require('express-async-errors')
const rp = require('request-promise')
const config = require('config')

class IndexController {
  async getNewMovieList(req, res) {
    const type = req.query.type || 'ZX'
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyao')}${type}`,
      method: 'GET',
      json: true
    }
    res.sendOk(await rp(options))
  }
}


module.exports = new IndexController()