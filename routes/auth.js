const express = require('express')
const router  = express.Router()
const artwekcontrol = require('../controllers/artwekcontrol')
const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register)
router.get('/', artwekcontrol.artwork)

module.exports = router
