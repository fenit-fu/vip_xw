require('express-async-errors')
const multer = require('multer')
const path = require('path')
const oss = require('../extend/oss')
const fs = require('fs')

class UploadController {
  async upload(req, res) {
    const storage = multer.diskStorage({
      destination: 'upload',
      filename: function (req, file, cb) {
        cb(null, 'university-' + Date.now() + file.originalname)
      }
    })
    multer({storage: storage}).single('file')(req, res, async () => {
      const result = await oss.put('university/' + req.file.originalname, path.join(__dirname, '../upload/' + req.file.filename), {})
      fs.unlink(path.join(__dirname, '../upload/' + req.file.filename), function (err) {
        console.log('delete fils', req.file.filename)
      })
      res.sendOk({url: result.url})
    })
  }
}

module.exports = new UploadController()
