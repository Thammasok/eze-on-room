const func = require('./func')
const validate = require('./validate')

const itemLists = async (req, res) => {
  func.itemLists().then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

const itemDetail = async (req, res) => {
  const body = await validate.itemId(req.params.itemId).catch(err => res.status(403).json(err))

  func.itemDetail(body.itemId).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

const newItem = async (req, res) => {
  const body = await validate.newItem(req.body).catch(err => res.status(403).json(err))

  func.addNewItem(body).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

const updateItem = async (req, res) => {
  const body = await validate.updateItem(req.params.itemId, req.body).catch(err => res.status(403).json(err))

  func.updateItem(body).then(result => {
    return res.status(200).json(result)
  }).catch(err => res.status(403).json(err))
}

const deleteItem = async (req, res) => {
  const body = await validate.itemId(req.params.itemId).catch(err => res.status(403).json(err))

  func.deleteItem(body.name).then(result => {
    return res.status(200).json({
      message: "delete file is success",
      result: result
    })
  }).catch(err => res.status(403).json(err))
}

module.exports = {
  itemLists,
  itemDetail,
  newItem,
  updateItem,
  deleteItem
}