const express = require('express')
const app = express()

const IndexController = require('../controllers/index')
const router = express.Router()

router.get('/carousel', IndexController.getCarouselList)
router.get('/cinemas-movies', IndexController.getCinemasMovies)
router.get('/movies', IndexController.getNewMovieList)
router.get('/seach', IndexController.getMovieListByName)
router.get('/detail', IndexController.getMovieDetailByUuid)

module.exports = router
