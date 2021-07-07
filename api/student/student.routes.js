const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware.js')
const { getStudents, addStudents } = require('../student/student.controller')
const router = express.Router()

router.get('/', getStudents)
router.post('/', requireAuth, requireAdmin, addStudents)
// router.delete('/:id',  requireAuth,requireAdmin, removeTeam)


module.exports = router