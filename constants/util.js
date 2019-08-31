const rp = require('request-promise')
const config = require('config')

const getM3u8Url = async function (uuid, playIndex) {
  const options = {
    url: `${config.get('reptileZxMovieUrl.xiaoxiaoys.getM3u8')}${uuid}?playindex=${playIndex}`,
    method: 'GET',
    gzip: true,
    json: true
  }
  const result = await rp(options)
  return result.data.httpurl || result.data.httpurl_preview
}

const _buildSeachListResult = function (result) {
  return result.data.vodrows.map(function (data) {
    return {
      uuid: data.vodid,
      name: data.title,
      cover: data.coverpic
    }
  })
}

const _buildHomePageResult = function (result) {
  return {
    sliderows: result.data.sliderows.map(function (data) {
      return {
        uuid: data.vodid,
        name: data.title,
        cover: data.pic
      }
    }),
    hotrows: result.data.hotrows.map(function (data) {
      return {
        uuid: data.vodid,
        name: data.title,
        cover: data.coverpic
      }
    }),
  }
}

const _buildDetailResult = async function (result, playIndex) {
  return {
    'uuid': result.data.vodrow.vodid,
    'name': result.data.vodrow.title,
    'classify': result.data.vodrow.catename,
    'director': result.data.vodrow.director_tags.map((item) => {
      return item.tagname
    }),
    'starring': result.data.vodrow.actor_tags.map((item) => {
      return item.tagname
    }),
    'releaseDate': result.data.vodrow.createtime,
    'cover': result.data.vodrow.coverpic,
    'intro': result.data.vodrow.intro,
    'playlist': result.data.vodrow.playlist,
    'playurl': await getM3u8Url(result.data.vodrow.vodid, playIndex)
  }
}

module.exports = {
  _buildSeachListResult,
  _buildHomePageResult,
  _buildDetailResult
}
