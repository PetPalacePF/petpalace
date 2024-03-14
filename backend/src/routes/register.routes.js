const { Router } = require('express')
const router = Router()

const register = require('../controllers/auth/register.js')

router.get('/', register) 

module.exports = router