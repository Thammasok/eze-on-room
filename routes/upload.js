const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares')
const { uploadFile } = require('../middlewares/upload')
const upload = require('../controllers/upload')

router.post('/', middlewares.auth, uploadFile.single('file'), upload.uploadFile)

module.exports = router
