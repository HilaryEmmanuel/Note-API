require('dotenv').config();
module.exports = {
    secret:process.env.JWT_SECRET,
    AccesTokenExpiration: 60, /* 1 minute */
    RefreshTokenExpiration: 120, /* 2 minute */

}
