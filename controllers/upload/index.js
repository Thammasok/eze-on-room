const fs = require('fs')
const func = require('./func')
const validate = require('./validate')

const uploadFile = async (req, res) => {
	if (req.fileValidationError) {
    return res.status(403).json({
      msg: req.fileValidationError
    })
  }
  
  func.newImage(req.file).then(result => {
    return res.status(200).json({
      image: {
        filename: req.file.filename,
        path: req.file.path.replace('public','')
      },
      save: result
    })
  }).catch(err => {
    return res.status(403).json(err)
  })
}

const fileLists = async (req, res) => {
  func.imageLists().then(result => {
    return res.status(200).json(result)
  }).catch(err => {
    return res.status(403).json(err)
  })
}

const fileDetail =  async (req, res) => {
  const params = await validate.imageId(req.params.imageId).catch(err => res.status(403).json(err))

  func.imageDetail(params.imageId).then(result => {
    return res.status(200).json({
      id: params.imageId,
      url: result.url
    })
  }).catch(err => {
    return res.status(403).json(err)
  })
}

const deleteFile = async (req, res) => {
  const params = await validate.imageId(req.params.imageId).catch(err => res.status(403).json(err))
  const image = await func.imageDetail(params.imageId).catch(err => res.status(403).json(err))

  func.deleteImage(params.imageId).then(result => {
    // Delete File
    fs.unlinkSync('public' + image.url)

    return res.status(200).json({
      msg: "delete file is success",
      result: result
    })
  })
}

module.exports = {
  uploadFile,
  fileLists,
  fileDetail,
  deleteFile
}