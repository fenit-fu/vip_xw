module.exports = function (app) {
  app.use('/api/v1/index', require('./router/index'))
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).send('router: ' + req.path + 'not found 404')
    }
  })
}

