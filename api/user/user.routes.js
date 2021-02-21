const express = require('express')
// const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
const {add} = require('./user.controller')

const router = express.Router()

router.post('/', add)

module.exports = router