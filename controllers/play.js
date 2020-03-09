require('express-async-errors')
const playService = require('../service/play')
const querystring = require('querystring')

class PlayController {
  async getTrueUrl(req, res) {
    res.sendOk(decodeURIComponent(querystring.stringify(req.query)))
  }
}

module.exports = new PlayController()
