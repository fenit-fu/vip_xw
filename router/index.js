const express = require('express')

const ViewRankController = require('../controllers/viewRanks')
const IndexController = require('../controllers/index')
const router = express.Router()

router.get('/carousel', IndexController.getCarouselList)
router.get('/movies', IndexController.getNewMovieList)
router.get('/seach', IndexController.getMovieListByName)
router.get('/detail', IndexController.getMovieDetailByUuid)
router.get('/view-rank', ViewRankController.getViewRank)
module.exports = router
