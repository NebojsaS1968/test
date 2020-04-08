const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const series = new Schema({
  title: String,
  rating: Number,
  seasons: Number,
  episodes: Number,
  genres: [String],
  actors: [String],
  plot: String,
  posterUrl: String
});
const Series = mongoose.model("series", series);
module.exports = Series;