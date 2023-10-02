const {checkSchema, query, validationResult, body} = require('express-validator');

const signupValidation = (req, res)=>{
// const { username, email, password } = req.body;

const result = validationResult(req);
if(!result.isEmpty){return res.status(400).json({ message : result.array()})}
}

module.exports = {signupValidation}