const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares')
const account = require('../controllers/account')

router.post('/signup', middlewares.normal, account.signup)
router.post('/signin', middlewares.normal, account.signin)

module.exports = router
