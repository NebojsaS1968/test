const Joi = require("joi");

const addFilmSchema = Joi.object({
  title: Joi.string().required(),
  plot: Joi.string().required(),
  year: Joi.number().required(),
  rating: Joi.number().required(),
  director: Joi.string().required(),
  runtime: Joi.number().required(),
  genres: Joi.array().items(Joi.string()).required(),
  actors: Joi.array().items(Joi.string()).required()
});

const updateFilmSchema = Joi.object({
    title: Joi.string(),
    plot: Joi.string(),
    runtime: Joi.number(),
    year: Joi.number(),
    rating: Joi.number(),
    director: Joi.string(),
    genres: Joi.array().items(Joi.string()),
    actors: Joi.array().items(Joi.string())
});

module.exports = { addFilmSchema, updateFilmSchema };