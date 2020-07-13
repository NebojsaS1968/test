const mongoose = require("mongoose")

const connect = () =>{
    return new Promise((resolve, reject) =>{
        mongoose
        .connect("mongodb://localhost:27017/testing", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to database..."))
        .catch((err) => {
            console.log(err)
            resolve()
        })
    })
}

const close = () =>{
    return mongoose.disconnect()
}

module.exports = {
    connect,
    close
}
