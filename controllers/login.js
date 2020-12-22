const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

const postLoginForm = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send({ err: "Player not found" })
  }
  const validPassword = await bcrypt.compare( req.body.password, user.password )
    if (!validPassword) {
        return res.status(400).send({ err:"Wrong password" })
    }
    const jwtToken = jwt.sign({ username: user.username, userId: user._id }, secret, { expiresIn: "900000" })
      res.cookie('token', jwtToken, {
      maxAge: 1000 * 60 * 15,
      secure: false,
      httpOnly: true
    })
    res.redirect('/api/v1/filmovi')
} 

const getLoginForm = async (req, res, next) => {
  res.render('login', {
    title: "Login"
  })
}

module.exports ={
  getLoginForm,
  postLoginForm
 }