const func = require('./func')
const validate = require('./validate')

exports.itemLists = async (req, res, next) => {
  func.itemLists().then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

exports.newItem = async (req, res, next) => {
  const body = await validate.newItem(req.body).catch(err => res.status(403).json(err))

  func.addNewItem(body).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

exports.updateItem = async (req, res, next) => {
  const body = await validate.updateItem(req.params.name, req.body).catch(err => res.status(403).json(err))

  func.updateItem(body).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

exports.deleteItem = async (req, res, next) => {
  const body = await validate.deleteItem(req.params.name).catch(err => res.status(403).json(err))

  func.deleteItem(body.name).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}