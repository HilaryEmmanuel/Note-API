const user = require('./user')
const note = require('./note')
const resetToken = require('./resettoken')
const refreshTokenFile = require('./refreshToken')
const createRefreshToken = refreshTokenFile.createRefreshToken
const RefreshToken = refreshTokenFile.RefreshToken
const verify = refreshTokenFile.verifyTokenExpiration
const invalidtokens = require('./invalidTokens')

const belongsToOperation = refreshTokenFile.RefreshToken.belongsTo(user, {
  foreignKey: 'id',
  targetKey: 'user_id',
  onDelete: 'CASCADE'
})

const hasOneOperation = user.hasOne(RefreshToken, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
})

const Association1 = note.belongsToMany(user, {
  through: 'user_notes',
  foreignKey: 'user_id',
  targetKey: 'user_id',
  onDelete: 'CASCADE'
})

// const Association2 = user.belongsTo(note, {
//     foreignKey: "user_id",
//     onDelete: 'CASCADE'
// })

module.exports = {
  user,
  note,
  invalidtokens,
  createRefreshToken,
  RefreshToken,
  verify,
  belongsToOperation,
  hasOneOperation,
  Association1,
  resetToken: resetToken.resetToken
  // Association2
}
