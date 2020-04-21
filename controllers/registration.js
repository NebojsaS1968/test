const User = require("../models/user")
const bcrypt = require("bcrypt")

const regUser = async (req, res, next) => {
  const user = new User(req.body)
  user.password = await bcrypt.hash(req.body.password, 10)
  const save = await user.save()
  res.status(200).send(save)
}

module.exports = { regUser }