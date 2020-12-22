const registerValid = (req, res, next) => {
    const { password, password2 } = req.body

    if(password !== password2){
        const error = {
            error: "Passwords do not match."
        }
        res.status(400).send(error)
    } else {
        next()
    }
}

module.exports = { registerValid }