module.exports = function (app) {
  app.use('/api/v1/home', require('./router/index'))
  app.use('/api/v1/play', require('./router/play'))
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).send('router: ' + req.path + 'not found 404')
    }
  })
}