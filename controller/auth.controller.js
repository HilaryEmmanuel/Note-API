const Model = require('../model/index');
const User = Model.user;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { secret } = require('../config/auth.config');
const auth_config = require('../config/index');
const AccesTokenExpiration = auth_config.AccesTokenExpiration;
const middleware = require('../middleware/invalidateTokens');
const invalidateToken = middleware.invalidateToken;
const refreshToken = Model.refreshToken;
const RefreshToken = Model.RefreshToken;
const verifyTokenExpiration = Model.verify

/* Main Entry */
const main = (req, res) => {
    res.json({
        message: "API is running"
    })
}


/* User SignUp */
const signup = async (req, res, next) => {
    /* save users to database */
    const { username, email, password } = req.body;
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashPassword) => {
        if (err) {
            return next(err);
        }
        try {
            await User.create({
                username: username,
                email: email,
                password: hashPassword,
                salt: salt,

            })

            return res.json({
                sucess: true,
                message: "User signUp was succesfull"
            })

        } catch (err) {
            console.error('User signUp not succesfull ', err);
            return res.status(500).json({
                sucess: false,
                message: "User signup failed"
            })
        }
    })

}




/* User Login */
const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
       const User_ = await User.findOne({
            where: { username: username }
        })
        if (!User_) {
            return res.status(404).json({
                success: false,
                accessToken: null,
                message: "incorrect username or password"
            })
        }

        // const user = await User.findOne({ where:{username : username}})
        crypto.pbkdf2(password, User_.salt, 310000, 32, 'sha256', async (err, hashPassword) => {
            if (err) {
                return next(err);
            }
            
            if (!crypto.timingSafeEqual(User_.password, hashPassword)) {
                return res.status(404).json({
                    success: false,
                    accessToken: null,
                    message: "incorrect username or password"
                })
            }

            const token = jwt.sign({ id: User_.user_id }, secret, { algorithm: 'HS256', expiresIn: AccesTokenExpiration })
            let refreshToken_ = await refreshToken(User_)
            return res.status(200).json({
                success: true,
                user: {
                    id: User_.user_id,
                    email: User_.email,
                    username: User_.username

                },
                accessToken: token,
                refreshToken: refreshToken_
            })
        })

    } catch (err) {
       return  console.log(err);
    }
}





/* verify RefreshToken */
const refreshAndVerifyToken = async (req, res) => {
    const { refreshToken: requestToken } = req.body; /*destructured refreshToken property from req.body and renamed it to requestToken */
    if (!requestToken) {
        return res.status(403).json({
            success: false,
            message: "Refresh token is required"
        })
    }
    try {
        let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
        if (!refreshToken) {
            return res.status(403).json({
                success: false,
                message: "Request Token is not in database"
            })
        }

        if (verifyTokenExpiration(refreshToken)) {
            await RefreshToken.destroy({ where: { id: refreshToken.id } })
            return res.status(403).json({
                success: false,
                message: "Request Token has Expired please make a new signin Request"
            })
        }

        const user =  refreshToken;
        let newAccessToken = jwt.sign({ id: user.id }, secret, { algorithm: 'HS256', expiresIn: AccesTokenExpiration })
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken,
            refreshToken: refreshToken.token
        })
    } catch (err) {
        console.error("Error .................... ", err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })


    }
}


/* User Logout */
const logout = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "token missing in headers"
        })
    }
    try {
        await invalidateToken(token);
        return res.status(200).json({
            success: true,
            message: "user logged out succesfully"
        })

    } catch (err) {
        console.error("Error Invalidating token.................... ", err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

module.exports = {
    main,
    signup,
    login,
    logout,
    refreshAndVerifyToken,
}