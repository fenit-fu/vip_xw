const config = require('config')
const rp = require('request-promise')

class HomeService {
  async getMovieDetailByUuid(uuid) {
    try {
      const options = {
        url: `${config.get('reptileZxMovieUrl.xiaoxiaoys.getdetail')}` + uuid + '?58819?playindex=1&apiVersion=28&deviceModel=SM-G9500&brand=samsung&deviceName=dreamqltechn&serial=988ed5375952443333&platform=android&version=2.1.32',
        method: 'GET',
        timeout: 1000 * 5,
        headers: {
          'cookie': 'xxx_api_auth=3362393230623137653836343362343861633866303262363332366532313730',
          'authority': 'sk4848y8b6qkymisc57n.xiaoxiaoimg.com'
        },
        gzip: true,
        json: true
      }
      return await rp(options)
    } catch (e) {

    }
  }
}

module.exports = new HomeService()
