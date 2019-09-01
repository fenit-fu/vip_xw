const rp = require('request-promise')

class PlayService {
  async findTrueUrl(m3u8Url) {
    const urlResult = PlayService.analysisDetailUrl(m3u8Url)
    return await PlayService.getFilmTrueUrl(urlResult)
  }

  static exitTsFile(result) {
    return result.substring(0, 400).indexOf('.ts') === -1
  }

  static analysisDetailUrl(m3u8Url) {
    const analysisResult = m3u8Url.split('/')
    let url1 = ''
    let url2 = ''
    for (let i = 0; i < analysisResult.length; i++) {
      url1 = analysisResult[0] + '//' + analysisResult[1] + analysisResult[2]
      if (i - 1 > 2) {
        url2 += '/' + analysisResult[i - 1]
      }
    }
    return {
      m3u8Url: m3u8Url,
      url1: url1,
      url2: url1 + url2
    }
  }

  static async getTeleplayTrueUrl(urlResult) {
    try {
      if (urlResult.m3u8Url.indexOf('.mp4') !== -1) {
        return urlResult.m3u8Url
      }
      const result = await rp({url: urlResult.m3u8Url, timeout: 1000 * 10, method: 'GET', json: true})
      if (PlayService.exitTsFile(result)) {
        const result1 = await rp({
          url: urlResult.url2 + '/' + result.split('\n')[2],
          timeout: 1000 * 10,
          method: 'GET',
          json: true
        })
        return PlayService.exitTsFile(result1) ? urlResult.url1 + result.split('\n')[2] : urlResult.url2 + '/' + result.split('\n')[2]
      } else {
        return urlResult.m3u8Url
      }
    } catch (e) {
      console.log(e)
      return '资源正在同步更新,敬请期待'
    }
  }

  static async getFilmTrueUrl(urlResult) {
    try {
      if (urlResult.m3u8Url.indexOf('.mp4') !== -1) {
        return urlResult.m3u8Url
      }
      const result = await rp({url: urlResult.m3u8Url, timeout: 1000 * 10, method: 'GET', json: true})
      if (PlayService.exitTsFile(result)) {
        if (result.split('\n')[2].substring(0, 1).indexOf('/') === -1) {
          return urlResult.url2 + '/' + result.split('\n')[2]
        } else {
          return urlResult.url1 + result.split('\n')[2]
        }
      } else {
        return urlResult.m3u8Url
      }
    } catch (e) {
      console.log(e)
      return '资源正在同步更新,敬请期待'
    }
  }
}

module.exports = new PlayService()
