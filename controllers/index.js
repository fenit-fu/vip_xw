require('express-async-errors')
const rp = require('request-promise')
const _ = require('lodash')
const config = require('config')
const carouseModel = require('../mongoose').carouse
const carouseService = require('../service/index')

class IndexController {
  async getCarouselList(req, res) {
    const result = await carouseModel.find()
    res.sendOk(result)
  }

  async getCinemasMovies(req, res) {
    res.sendOk([
      // {
      //   'uuid': '7',
      //   'name': '绿皮书',
      //   'classify': '剧情片',
      //   'director': '彼得·法雷利',
      //   'starring': '维果·莫腾森,马赫沙拉·阿里,琳达·卡德里尼,塞巴斯蒂安·马尼斯科',
      //   'releaseDate': '2019-03-01',
      //   'cover': 'http://www.haitum.com/upload/resource/110_27203_thumb.jpg',
      //   'intro': '名黑人钢琴家，为前往种族歧视严重的南方巡演，找了一个粗暴的白人混混做司机。在一路开车南下的过程里，截然不同的两人矛盾不断，引发了不少争吵和笑料。但又在彼此最需要的时候，一起共渡难关。行程临近结束，两人也慢慢放下了偏见......绿皮书，是一本专为黑人而设的旅行指南，标注了各城市中允许黑人进入的旅店、餐馆。电影由真实故事改编',
      //   'url': 'https://iqiyi.com-l-iqiyi.com/20190118/21145_2958fd4c/1000k/hls/index.m3u8',
      // },
      {
        'uuid': '1',
        'name': '战斗天使',
        'classify': '科幻片',
        'director': '罗伯特·罗德里格兹',
        'starring': '詹姆斯·卡梅隆、莱塔·卡罗格里迪斯',
        'releaseDate': '2019-02-23',
        'cover': 'https://img.xiguaimg.com/pic/uploadimg/2018-12/20181271134064772.jpg',
        'intro': '阿丽塔：战斗天使》根据日本漫画家木城雪户的代表作《铳梦》改编，讲述了末世时代，半人半机械的生理架构已经不足为奇。某天倒在废墟中仅剩头颅的阿丽塔被艾德医生捡起，以机械为血肉重见人间。但苏醒后她完全丧失了记忆，对自己的身世一无所知',
        'url': 'https://youku.xlabzjx.com/20190223/Bry3WcZu/index.m3u8',
      }, {
        'uuid': '2',
        'name': '一吻定情2019',
        'classify': '喜剧',
        'director': '陈玉珊',
        'starring': '王大陆 林允 陈柏融 蔡思韵 邰智源 ',
        'releaseDate': '2019-02-15',
        'cover': 'https://img.kuyun88.com/pic/uploadimg/2019-2/201921512591130960.jpg',
        'intro': '笨蛋爱上天才，会有结果吗？平凡女孩原湘琴（林允饰）喜欢上了天才少年江直树（王大陆饰），在她表白失败准备放弃之际，爸爸居然带着自己搬进了直树家里？！一个猛追，一个猛逃',
        'url': 'https://acfun.iqiyi-kuyun.com/ppvod/6CF94FDBE9BB49B83FA30FD679F76E46.m3u8',
      }, {
        'uuid': '3',
        'name': '流浪地球',
        'classify': '科幻片',
        'director': '郭帆',
        'starring': '屈楚萧,吴京,李',
        'releaseDate': '2019-02-08',
        'cover': 'http://pic.zuikzy.com/upload/vod/2019-02-06/15494446320.jpg',
        'intro': '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新家园。然而宇宙之路危机四伏，为了拯救地球，为了人类能在漫长的2500年后抵达新的家园，流浪地球时代的年轻人挺身而出，展开争分夺秒的生死之战。',
        'url': 'https://acfun.iqiyi-kuyun.com/ppvod/CEA373893E753431106BE1FE32BF5054.m3u8'
      }, {
        'uuid': '4',
        'name': '疯狂的外星人',
        'classify': '喜剧片',
        'director': '宁浩',
        'starring': '黄渤,沈腾,马修',
        'releaseDate': '2019-02-08',
        'cover': 'https://img.xiguaimg.com/pic/uploadimg/2019-2/2019273335484116.jpg',
        'tag': '高清',
        'intro': '耿浩（黄渤 饰）与一心想发大财的好兄弟大飞（沈腾 饰），经营着各自惨淡的“事业”，然而“天外来客”的意外降临，打破了二人平静又拮据的生活。神秘的西方力量也派出“哼哈二将”在全球搜查外星人行踪。啼笑皆非的跨物种对决，别开生面的“星战”，在中国某海边城市激情上演。',
        'url': 'http://youku.com-l-youku.com/20190207/20333_87dc3583/1000k/hls/index.m3u8'
      }, {
        'uuid': '5',
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
        'uuid': '6',
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
    res.sendOk(await carouseService.getMovieDetailByUuid(id))
  }
}


module.exports = new IndexController()
