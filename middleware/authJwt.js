const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const secret = config.secret

// Handle Token Expiration Error
const { TokenExpiredError } = jwt
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .json({
        success: false,
        messsage: 'Unauthorized! Access Token was Expired'
      })
  }
  return res.status(401).json({ success: false, message: 'Unauthorized!' })
}

// Token verification
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: 'No Token provided!' })
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('verification error ' + err)
      return catchError(err, res)
    }
    req.user_id = decoded.id
    next()
  })
}

module.exports = { verifyToken }
