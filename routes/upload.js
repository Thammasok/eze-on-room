const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares')
const { uploadFile } = require('../middlewares/upload')
const upload = require('../controllers/upload')

router.put('/', middlewares.authNoContentType, uploadFile.single('file'), upload.uploadFile)
router.post('/', middlewares.auth, upload.fileLists)
router.post('/:imageId', middlewares.auth, upload.fileDetail)
router.delete('/:imageId', middlewares.auth, upload.deleteFile)

module.exports = router
