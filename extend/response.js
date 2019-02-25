const lodash = require('lodash')
module.exports = function (req, res, next) {
  const unifyResult = {
    sendOk: function (data) {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'X-Requested-With')
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
      res.header('X-Powered-By', ' 3.2.1')
      res.header('Content-Type', 'application/json;charset=utf-8')
      return res.send(lodash.extend({
        code: 0,
        msg: 'ok',
        result: data || {}
      }))
    },
    setAttachment: function (fileName) {
      res.setHeader('Content-Type', 'application/octet-stream')
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=rank_' + fileName + '.xlsx'
      )
    }
  }
  lodash.extend(res, unifyResult)
  next()
}

