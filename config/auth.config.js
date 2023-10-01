require('dotenv').config();
module.exports = {
    secret:process.env.JWT_SECRET,
    AccesTokenExpiration: 300, /* 1 minute 60 */
    RefreshTokenExpiration: 500, /* 2 minute 120*/
}
