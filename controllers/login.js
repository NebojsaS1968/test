const User = require("../models/user")
const bcrypt = require("bcrypt")

const findUser = async (req, res, next) => {
  let user = await User.findOne({ name: req.body.name })
  if (!user) {
    return res.status(400).send({ err: "Player not found" })
  }
  const validPassword = await bcrypt.compare( req.body.password, user.password )
    if (!validPassword) {
        return res.status(400).send({ err:"Wrong password" })
    }
    res.send(true)
}

module.exports = { findUser }