const { Router } = require('express')
const router = Router()

const login = require('../controllers/auth/login.js')

router.get('/', login) 

module.exports = router