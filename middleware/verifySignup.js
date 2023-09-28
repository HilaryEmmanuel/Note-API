const Users = require('../model/user')

const verifyUsernameAndEmail = async (req, res, next) => {
    const { username, email } = req.body
    try {
        const User = await Users.findOne({ where: { username: username } })
        if (User) {
            return res.status(400).json({
                sucess: false,
                message: "username is already in use!"
            });
        }

        const Email = await Users.findOne({ where: { email: email } })
        if (Email) {
            return res.status(400).json({
                sucess: false,
                message: "email is already in use!"
            })

        }
        next();

    } catch (err) {
        return (res.status(500).json({
            sucess: false,
            message: "unable to validate username"
        }), next(err));
    }

}

module.exports = { verifyUsernameAndEmail };