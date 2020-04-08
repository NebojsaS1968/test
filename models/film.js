const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const film = new Schema({
  title: String,
  rating: Number,
  year: Number,
  runtime: Number,
  genres: [String],
  director: String,
  actors: [String],
  plot: String,
  posterUrl: String
});
const Film = mongoose.model("film", film);
module.exports = Film;