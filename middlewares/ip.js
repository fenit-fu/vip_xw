module.exports = (req, res, next) => {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress
  throw Error(ip + '由于访问频率过高暂时被封 请一小时后再试')
  return next()
}