const { checkSchema, query, validationResult } = require('express-validator')

const signupValidation = (req, res) => {
  query('searchQuery').notEmpty()
  const result = validationResult(req)
  if (result.isEmpty()) {
    return res.status(200).json({ success: true })
  }
  return res.json({ errors: result.array() })

  // const { username, email, password } = req.body;

//   if (!result.isEmpty) { return res.status(400).json({ message: result.array() }) }
// }
}
module.exports = { signupValidation }
