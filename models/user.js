const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
  username: String,
  password: String,
  email: String,
  movies: [
    {
      movie: {
        type: Schema.Types.ObjectId,
        ref: "film"
      },
      grade: Number
    }
  ]
});
const User = mongoose.model("user", user);
module.exports = User;