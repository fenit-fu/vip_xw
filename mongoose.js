const mongoose = require('mongoose')
const url = 'mongodb://39.98.215.216:30003/xwys-test'

mongoose.connect(url)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
})

const models = {}
models.carouse = require('./models/index')(mongoose).carouse

module.exports = models