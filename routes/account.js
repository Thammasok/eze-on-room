const express = require('express')
const router = express.Router()

const middlewares = require('../middlewares')
const account = require('../controllers/account')

router.post('/', middlewares.normal, account.createUser);

module.exports = router
