const express = require('express')

const {getTeams, addTeam, removeTeam} = require('./team.controller')
const router = express.Router()

router.get('/', getTeams)
router.post('/', addTeam)
router.delete('/:id', removeTeam)

// TODO: Add Middleware
// router.get('/',requireAuth, getTeams)
// router.delete('/:id',  requireAuth, removeTeam)

module.exports = router