const multer = require('multer')
const randomstring = require("randomstring")
const moment = require('moment')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    const name = randomstring.generate()
    const fileExtension = file.originalname.split('.')[1]
    // cb(null, file.originalname)

    cb(null, moment().format('YYYYMMDD') + '' + name + '.' + fileExtension)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    //reject a file
    req.fileValidationError = 'goes wrong on the mimetype'
    cb(null, false)
  }
}

const uploadFile = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

module.exports = {
  uploadFile
}