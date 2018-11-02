const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares')
const store = require('../controllers/store')

router.post('/item', middlewares.auth, store.itemLists)
router.post('/item/:itemId', middlewares.auth, store.itemDetail)
router.put('/item', middlewares.auth, store.newItem)
router.put('/item/:itemId', middlewares.auth, store.updateItem)
router.delete('/item/:itemId', middlewares.auth, store.deleteItem)

module.exports = router
