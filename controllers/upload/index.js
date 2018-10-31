const func = require('./func')
const validate = require('./validate')

const uploadFile = async (req, res, next) => {
	if (req.fileValidationError) {
    return res.status(403).json({
      msg: req.fileValidationError
    })
  }

  return res.status(200).json(req.file)

  // Delete File
  // fs.unlinkSync(req.file.path)
}

module.exports = {
	uploadFile
}