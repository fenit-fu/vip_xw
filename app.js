const express = require('express')
const config = require('config')
const path = require('path')
const bodyParser = require('body-parser')
require('express-async-errors')

const app = express()

require('./mongoose')
require('./redis')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('./extend/response'))

require('./router')(app)

app.use(function (err, req, res, next) {
  res.status(500)
  res.send({
    code: 1,
    msg: 'error',
    message: err.toString()
  })
})
app.listen(config.get('port'), function () {
  console.log('listen success')
})
