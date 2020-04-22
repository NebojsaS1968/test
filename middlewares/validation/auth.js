const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {
  
  const token = req.headers.authorization.split(" ")[1]
  try {
    jwt.verify(token, "Profesionalac")
    next()
  } catch (err) {
    const defaultError = {
      message: "Authorization error!",
      value: err
    }
    res.status(400).send({ error: defaultError })
  }
}

module.exports = { auth }