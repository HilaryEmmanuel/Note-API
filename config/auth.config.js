require('dotenv').config();
module.exports = {
    secret:process.env.JWT_SECRET,
    AccesTokenExpiration: 3600000, // 1 hour
    RefreshTokenExpiration:  604800000 // 7 days 
}
