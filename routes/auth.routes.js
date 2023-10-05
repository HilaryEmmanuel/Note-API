const express = require('express');
const controller = require('../controller/index');
const middleware = require('../middleware/index');
const router = express.Router();

/* json response */
router.get('/', controller.main)

/* Authentication */
/**
 * @swagger
 * https://note-api-amz2.onrender.com/api/v1/auth/signup:
 *   post:
 *     summary:  User signup
 *     description: Create a User that satisfies the SignUp criterias.
*/
router.post('/api/v1/auth/signup', middleware.verifySignup , controller.signup);

router.post('/api/v1/auth/login', controller.login);

router.post('/api/v1/auth/refreshToken', controller.refreshAndVerifyToken);

router.post('/api/v1/auth/forgot-password', controller.forgotPassword);

router.post('/api/v1/auth/reset-password', controller.resetPassword);

router.post('/api/v1/auth/logout', controller.logout);

module.exports = router;