const user = require('./user');
const note = require('./note');
const refreshTokenFile = require('./refreshToken');
const refreshToken = refreshTokenFile.createRefreshToken;
const RefreshToken = refreshTokenFile.RefreshToken;
const verify = refreshTokenFile.verifyTokenExpiration;
const invalidtokens = require('./invalidTokens');

const belongsToOperation = refreshTokenFile.RefreshToken.belongsTo(user, {
    foreignKey: "id", 
    targetKey: "user_id",
    onDelete: 'CASCADE'
})

const hasOneOperation = user.hasOne(RefreshToken, {
    foreignKey: "id",
    onDelete: 'CASCADE'

    
})

const Association1 = note.belongsToMany(user, {
    through: "user_notes",
    foreignKey: "user_id",
    targetKey: "user_id",
    onDelete: 'CASCADE'
});

// const Association2 = user.belongsTo(note, {
//     foreignKey: "user_id",
//     onDelete: 'CASCADE'
// })

module.exports = {
    user,
    note,
    invalidtokens,
    refreshToken,
    RefreshToken,
    verify,
    belongsToOperation,
    hasOneOperation,
    Association1,
    // Association2
}