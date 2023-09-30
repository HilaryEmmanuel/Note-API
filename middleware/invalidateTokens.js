const model = require('../model');
const invalidTokens = model.invalidtokens;

/* Function to invalidate a token and store it in the database*/
const invalidateToken = async (token) => {
    try {
        const result = await invalidTokens.create({ jwt_token: token })
        return result;
    } catch (err) {
        throw err;
    }
}

/* Check For Token that are blackListed*/
const checkTokenBlackList = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) { return res.status(400).json({ success: false, message: "token is missing" }) }
    try {
        const invalidateToken = await invalidTokens.findOne({ where: { jwt_token: token } })
        if (invalidateToken) { return res.status(401).json({ success: false, message: "token is invalid" }) }
        next();
    } catch (err) {
        console.error("Error checking token Blacklist " + err);
        return res.status(500).json({success: false,message: "Internal server  Error"})
    }

}
module.exports = {
    checkTokenBlackList,
    invalidateToken
}



