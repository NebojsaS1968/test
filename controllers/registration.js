const User = require("../models/user")
const bcrypt = require("bcrypt")

const regUser = async (req, res, next) => {
  const newUserBody = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  const user = await User.findOne({ email: req.body.email })
  if(user) {
    // User exists
    res.send({ msg: "User with that email already exists!" })
  } else {
    // User doesn't exist
    const newUser = new User(newUserBody)
    newUser.password = await bcrypt.hash(req.body.password, 10)
    await newUser.save()
    // res.status(201).send({ msg: `User ${newUser.username} saved`, newUser: save })
    res.render('login', {
      title: "Login"
    })
  }
}

const getRegForm = async (req, res, next) => {
  res.render('registration', {
    title: "Register"
  })
}

module.exports = { regUser, getRegForm }