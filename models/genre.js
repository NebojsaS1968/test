const mongoose = require("mongoose")
const Schema = mongoose.Schema
const genre = new Schema({
  name: String,
  movies: [{
    type: Schema.Types.ObjectId,
    ref: "film"
  }]
});
const Genre = mongoose.model("genre", genre)
module.exports = Genre