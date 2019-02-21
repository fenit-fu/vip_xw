const lodash = require('lodash')
module.exports = function (req, res, next) {
  const unifyResult = {
    sendOk: function (data) {
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

