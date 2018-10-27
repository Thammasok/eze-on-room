const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares')
const store = require('../controllers/store')

router.post('/item', middlewares.auth, store.itemLists)
router.put('/item', middlewares.auth, store.newItem)
router.put('/item/:name', middlewares.auth, store.updateItem)
router.delete('/item/:name', middlewares.auth, store.deleteItem)

module.exports = router
