require('express-async-errors')
const playService = require('../service/play')

class PlayController {
  async getTrueUrl(req, res) {
    const m3u8Url = req.query.m3u8
    res.sendOk(await playService.findTrueUrl(m3u8Url))
  }
}

module.exports = new PlayController()
