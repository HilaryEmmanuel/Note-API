const authConfig = require('./auth.config');
const dbConfig = require('./db.config');
const cloudinaryConfig = require('./cloudinary.config')

module.exports = {
    authConfig: authConfig.secret,
    RefreshTokenExpiration: authConfig.RefreshTokenExpiration,
    AccesTokenExpiration: authConfig.AccesTokenExpiration,
    dbConfig: dbConfig.dbconnection,
    cloudinaryConfig : cloudinaryConfig.storage
}