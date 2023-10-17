require('dotenv').config()
module.exports = {
  secret: process.env.JWT_SECRET,
  RefreshTokenExpiration: 604800000 // 7 days
}
