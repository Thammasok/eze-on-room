const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'text/csv') {
//     cb(null, true)
//   } else {
//     //reject a file
//     req.fileValidationError = 'goes wrong on the mimetype'
//     cb(null, false)
//   }
// }

const uploadFile = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  // fileFilter: fileFilter
})

module.exports = {
  uploadFile
}