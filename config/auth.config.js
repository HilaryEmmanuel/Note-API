require('dotenv').config();
module.exports = {
    secret:process.env.JWT_SECRET,
    AccesTokenExpiration: 1000, /* 1 minute 60 */
    RefreshTokenExpiration: 2000, /* 2 minute 120*/
}
