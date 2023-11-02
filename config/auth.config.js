require('dotenv').config()
module.exports = {
  secret: process.env.JWT_SECRET,
  RefreshTokenExpiration: 86400 // 7 days
}
