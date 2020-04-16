const mongoose = require("mongoose")
const Schema = mongoose.Schema
const actor = new Schema({
  name: String,
  age: Number,
  awards: [String],
  movies: [{
    type: Schema.Types.ObjectId,
    ref: "film"
  }]
});
const Actor = mongoose.model("actor", actor)
module.exports = Actor