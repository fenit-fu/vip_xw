const express = require('express')
const PlayController = require('../controllers/play')
const router = express.Router()

router.get('/url', PlayController.getTrueUrl)

module.exports = router

