const authConfig = require('./auth.config');
const dbConfig = require('./db.config');

module.exports = {
    authConfig: authConfig.secret,
    RefreshTokenExpiration: authConfig.RefreshTokenExpiration,
    AccesTokenExpiration: authConfig.AccesTokenExpiration,
    dbConfig: dbConfig.dbconnection,

}