const express = require('express')
const IndexController = require('../controllers/index')
const router = express.Router()

router.get('/new-movies', IndexController.getNewMovieList)
router.get('/carousel', IndexController.getCarouselList)
module.exports = router

