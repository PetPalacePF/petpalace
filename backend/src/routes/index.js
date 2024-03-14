const { Router } = require('express')

const router = Router()

// * Rutas
const login = require('./login.routes')
const register = require('./register.routes')

router.use('/login', login)
router.use('/register', register)

module.exports = router