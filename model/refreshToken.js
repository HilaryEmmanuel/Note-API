const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()
const config = require('../config/index')
const { v4: uuidv4 } = require('uuid')
const RefreshTokenExpiration = config.RefreshTokenExpiration
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, { dialect: 'postgres', dialectOptions: { ssl: true }, logging: false })
// const sequelize = new Sequelize(
//   `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
//   { dialect: 'postgres' }
// )
// sequelize.sync()
// sequelize.sync({ force : true})
const RefreshToken = sequelize.define(
  'refreshtoken',
  {
     // model Attributes
    token: {
      type: DataTypes.STRING
    },

    expiryDate: {
      type: DataTypes.DATE
    }
  },
  {
    createdAt: false,
    updatedAt: false
  }
)

const createRefreshToken = (RefreshToken.createToken = async function (user) {
  const expireAt = new Date()
  const _token = uuidv4()
  expireAt.setSeconds(expireAt.getSeconds() + RefreshTokenExpiration)

  const refreshToken = await RefreshToken.create({
    token: _token,
    id: user.user_id,
    expiryDate: expireAt.getTime()
  })

  return refreshToken.token
})

const verifyTokenExpiration = (RefreshToken.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime()
})

// RefreshToken.drop();
// return RefreshToken;
module.exports = {
  RefreshToken,
  createRefreshToken,
  verifyTokenExpiration
}
