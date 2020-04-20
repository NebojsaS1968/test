const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema({
  name: String,
  password: String,
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "film",
    },
  ],
});
const User = mongoose.model("user", user);
module.exports = User;