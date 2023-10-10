const authConfig = require('./auth.config')
const dbConfig = require('./db.config')
const cloudinaryConfig = require('./cloudinary.config')
const nodemailerrConfig = require('./nodemailer.config')

module.exports = {
  authConfig: authConfig.secret,
  RefreshTokenExpiration: authConfig.RefreshTokenExpiration,
  AccesTokenExpiration: authConfig.AccesTokenExpiration,
  dbConfig: dbConfig.dbconnection,
  cloudinaryConfig: cloudinaryConfig.storage,
  nodemailerrConfig: nodemailerrConfig.transporter,
  passwordReset: nodemailerrConfig.passwordResetEmail
}
