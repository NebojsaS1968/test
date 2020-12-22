const secret = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
  const token = req.cookies.token
  if(!token){
    return res.status(401).json('You need to Login')
  }
  try {
    jwt.verify(token, secret)
    next()
  } catch (err) {
    const defaultError = {
      message: "Authentification error!",
      value: err
    }
    res.status(400).send({ error: defaultError })
  }
}

module.exports = { auth }