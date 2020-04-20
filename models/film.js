const mongoose = require("mongoose")
const Schema = mongoose.Schema
const film = new Schema({
  title: String,
  rating: Number,
  year: Number,
  runtime: Number,
  users: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  actors: [{
    type: Schema.Types.ObjectId,
    ref: "actor"
  }],
  genres: [{
    type: Schema.Types.ObjectId,
    ref: "genre"
  }],
  director: String,
  plot: String,
  posterUrl: String
});
const Film = mongoose.model("film", film)
module.exports = Film