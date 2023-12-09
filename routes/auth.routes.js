const express = require('express')
const controller = require('../controller/index')
const middleware = require('../middleware/index')
const router = express.Router()

// Base route Endpoint
router.get('/', controller.main)

router.post('/api/v1/auth/signup', middleware.verifySignup, controller.signup)

router.post('/api/v1/auth/login', controller.login)

router.post('/api/v1/auth/refreshToken', controller.refreshAndVerifyToken)

router.post('/api/v1/auth/forgot-password', controller.forgotPassword)

router.post('/api/v1/auth/reset-password', controller.resetPassword)

router.post('/api/v1/auth/logout', controller.logout)

module.exports = router
