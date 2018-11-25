const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares')
const accountController = require('../controllers/account')

router.post('/signup', middlewares.normal, accountController.signup)
router.post('/signin', middlewares.normal, accountController.signin)

module.exports = router
