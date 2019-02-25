require('express-async-errors')
const rp = require('request-promise')
const _ = require('lodash')
const config = require('config')
const carouseModel = require('../mongoose').carouse

class IndexController {
  async getCarouselList(req, res) {
    const result = await carouseModel.find()
    res.sendOk(result)
  }

  async getCinemasMovies(req, res) {
    res.sendOk([{
      'name': '战斗天使',
      'classify': '科幻片',
      'director': '卡梅隆',
      'starring': '卡梅隆',
      'releaseDate': '2019-02-22',
      'cover': 'http://pic.zuikzy.com/upload/vod/2019-02-06/15494446320.jpg',
      'intro': '战斗天使',
      'url': 'http://bilibili.com-l-bilibili.com/20190223/8039_6a310f25/1000k/hls/index.m3u8',
    }, {
      'name': '流浪地球',
      'classify': '科幻片',
      'director': '郭帆',
      'starring': '屈楚萧,吴京,李',
      'releaseDate': '2019-02-08',
      'cover': 'http://pic.zuikzy.com/upload/vod/2019-02-06/15494446320.jpg',
      'intro': '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新家园。然而宇宙之路危机四伏，为了拯救地球，为了人类能在漫长的2500年后抵达新的家园，流浪地球时代的年轻人挺身而出，展开争分夺秒的生死之战。',
      'url': 'https://acfun.iqiyi-kuyun.com/ppvod/CEA373893E753431106BE1FE32BF5054.m3u8'
    }, {
      'name': '疯狂的外星人',
      'classify': '喜剧片',
      'director': '宁浩',
      'starring': '黄渤,沈腾,马修',
      'releaseDate': '2019-02-08',
      'cover': 'http://img1.doubanio.com/view/photo/s_ratio_poster/public/p2541901817.jpg',
      'tag': '高清',
      'intro': '耿浩（黄渤 饰）与一心想发大财的好兄弟大飞（沈腾 饰），经营着各自惨淡的“事业”，然而“天外来客”的意外降临，打破了二人平静又拮据的生活。神秘的西方力量也派出“哼哈二将”在全球搜查外星人行踪。啼笑皆非的跨物种对决，别开生面的“星战”，在中国某海边城市激情上演。',
      'url': 'http://youku.com-l-youku.com/20190207/20333_87dc3583/1000k/hls/index.m3u8'
    }, {
      'name': '神探蒲松龄',
      'classify': '喜剧片',
      'director': '严嘉',
      'starring': '成龙,阮经天,钟',
      'releaseDate': '2019-02-08',
      'cover': 'http://pic.zuikzy.com/upload/vod/2019-02-06/15494143326.jpg',
      'tag': '高清',
      'intro': '一代文豪蒲松龄（成龙饰）执阴阳判化身神探，与捕快严飞（林柏宏饰）联手追踪金华镇少女失踪案。蒲松龄带领“猪狮虎”“屁屁”“忘忧”“千手”等一众小妖深入案情，在找寻真相的过程中，牵扯出一段旷世奇恋。',
      'url': 'http://bilibili.com-l-bilibili.com/20190207/8035_af0c52a1/1000k/hls/index.m3u8'
    }, {
      'name': '神探蒲松龄',
      'classify': '喜剧片',
      'director': '严嘉',
      'starring': '成龙,阮经天,钟',
      'releaseDate': '2019-02-08',
      'cover': 'http://pic.zuikzy.com/upload/vod/2019-02-06/15494143326.jpg',
      'tag': '高清',
      'intro': '一代文豪蒲松龄（成龙饰）执阴阳判化身神探，与捕快严飞（林柏宏饰）联手追踪金华镇少女失踪案。蒲松龄带领“猪狮虎”“屁屁”“忘忧”“千手”等一众小妖深入案情，在找寻真相的过程中，牵扯出一段旷世奇恋。',
      'url': 'http://bilibili.com-l-bilibili.com/20190207/8035_af0c52a1/1000k/hls/index.m3u8'
    }, {
      'name': '飞驰人生',
      'classify': '喜剧片',
      'director': '韩寒',
      'starring': '沈腾,黄景瑜,尹',
      'releaseDate': '2019-02-08',
      'cover': 'http://img.kuyun88.com/pic/uploadimg/2019-2/20192423202435417.jpg',
      'tag': '高清',
      'intro': '曾经在赛车界叱咤风云,如今却只能经营炒饭大排档的赛车手张驰（沈腾饰）决定重返车坛挑战年轻一代的天才。然而没钱没车没队友，甚至驾照都得重新考，这场笑料百出不断被打脸的复出之路，还有更多哭笑不得的窘境在等待着这位过气车神……',
      'url': 'http://youku.com-l-youku.com/20190207/20332_cdc7792b/1000k/hls/index.m3u8'
    }])
  }

  async getNewMovieList(req, res) {
    const type = req.query.type || 'ZX'
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyao.list')}${type}`,
      method: 'GET',
      json: true
    }
    const result = await rp(options)
    const filterResult = _.filter(result, (item) => {
      return (item.url).indexOf('http://v.yimohui2017.com') === -1
        && (item.url).indexOf('http://v.sanyiwangluo.com') === -1
        && (item.url).indexOf('v.lyerhuo.com') === -1
        && (item.url).indexOf('v.ynkqx.com') === -1
        && (item.url).indexOf('v.zhubodasai.com') === -1
        && (item.url).indexOf('v.aimushang.com') === -1
        && (item.url).indexOf('v.shinegobaby.com') === -1
    })
    res.sendOk(filterResult)
    // res.sendOk(_.map(filterResult, function (item) {
    //   return {
    //     uuid: item.uuid,
    //     name: item.name,
    //     url: item.url
    //   }
    // }))
  }

  async getMovieListByName(req, res) {
    const name = (req.query.name)
    const options = {
      url: `${config.get('reptileZxMovieUrl.wangzherongyao.search')}` + encodeURIComponent(name),
      timeout: 1000 * 5,
      method: 'GET',
      json: true
    }
    res.sendOk(await rp(options))
  }

  async getMovieDetailByUuid(req, res) {
    const id = (req.query.uuid).trim()
    try {
      const filmOptions = {
        url: `${config.get('reptileZxMovieUrl.wangzherongyao.filmDetail')}` + id + '?uuid=' + id,
        method: 'GET',
        json: true
      }
      const filmResult = await rp(filmOptions)
      if ((filmResult.url).indexOf('http://v.yimohui2017.com') === -1
        && (filmResult.url).indexOf('http://v.sanyiwangluo.com') === -1
        && (filmResult.url).indexOf('v.lyerhuo.com') === -1
        && (filmResult.url).indexOf('v.ynkqx.com') === -1
        && (filmResult.url).indexOf('v.zhubodasai.com') === -1
        && (filmResult.url).indexOf('v.aimushang.com') === -1
        && (filmResult.url).indexOf('v.shinegobaby.com') === -1) {
        return res.sendOk({
          data: filmResult,
          type: 'film'
        })
      }
      else {
        return res.sendOk('此视频以后台记录保存即将上架')
      }
    }
    catch (e) {
      const teleplayOptions = {
        url: `${config.get('reptileZxMovieUrl.wangzherongyao.teleplayDetail')}` + id + '?uuid=' + id,
        method: 'GET',
        json: true
      }
      const teleplayResult = await rp(teleplayOptions)
      return res.sendOk({
        data: teleplayResult,
        type: 'teleplay'
      })
    }
  }
}


module.exports = new IndexController()