const express = require('express');
const controller = require('../controller/index');
const signup = controller.signup;
const login = controller.login;
const logout = controller.logout
const main = controller.main;
const refreshAndVerifyToken = controller.refreshAndVerifyToken
const middleware = require('../middleware/index');
const verifyUsernameAndEmail = middleware.verifySignup;
const jwtauth = middleware.authJwt;
const router = express.Router();

/* json response */
router.get('/', main)

/* Authentication */
router.post('/api/v1/auth/signup', verifyUsernameAndEmail , signup);
router.post('/api/v1/auth/login', login, jwtauth);
router.post('/api/v1/auth/refreshToken', refreshAndVerifyToken)
router.post('/api/v1/auth/dashboard')
router.post('/api/v1/auth/logout', logout)

module.exports = router;