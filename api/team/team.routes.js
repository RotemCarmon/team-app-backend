const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware.js')
const { getTeams, addTeam, removeTeam } = require('./team.controller')
const router = express.Router()

router.get('/', getTeams)
router.post('/', addTeam)
router.delete('/:id', requireAuth, requireAdmin, removeTeam)
// router.get('/', getTeams)
// router.delete('/:id', removeTeam)

// TODO: Add Middleware

module.exports = router