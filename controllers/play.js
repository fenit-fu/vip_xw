require('express-async-errors')
const querystring = require('querystring')

class PlayController {
  async getTrueUrl(req, res) {
    res.sendOk(decodeURIComponent(querystring.stringify(req.query)).substring(5))
  }
}

module.exports = new PlayController()
