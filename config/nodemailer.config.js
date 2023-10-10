const nodemailer = require('nodemailer')
require('dotenv').config()
// nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.APP_PASSWORD
  }
})

const passwordResetEmail = (email, token) => {
  const resetLink = `http://mywebsite//${token}`
  const mailOptions = {
    from: process.env.USER_NAME,
    to: email,
    subject: 'Password Reset',
    text: `Click the following Link to reset your Password ${resetLink}`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log('Error sending mail ', err)
    }
    return console.log('Email sent ' + info.messageId)
  })
}
module.exports = { transporter, passwordResetEmail }
