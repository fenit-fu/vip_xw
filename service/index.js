const config = require('config')
const rp = require('request-promise')

class HomeService {
  async getMovieDetailByUuid(uuid) {
    try {
      const options = {
        url: `${config.get('reptileZxMovieUrl.xiaoxiaoys.getdetail')}` + uuid,
        method: 'GET',
        timeout: 1000 * 5,
        gzip:true,
        json: true
      }
      return await rp(options)
    } catch (e) {

    }
  }
}

module.exports = new HomeService()
