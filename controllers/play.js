require('express-async-errors')
const playService = require('../service/play')

class PlayController {
  async getTrueUrl(req, res) {
    const filmType = req.query.type
    const m3u8Url = req.query.m3u8
    res.sendOk(await playService.findTrueUrl(filmType, m3u8Url))
  }
}

module.exports = new PlayController()