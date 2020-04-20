const Joi = require("joi");

const addFilmSchema = Joi.object({
  title: Joi.string().required(),
  plot: Joi.string().required(),
  year: Joi.number().required(),
  rating: Joi.number().required(),
  director: Joi.string().required(),
  runtime: Joi.number().required(),
});

const updateFilmSchema = Joi.object({
    title: Joi.string(),
    plot: Joi.string(),
    runtime: Joi.number(),
    year: Joi.number(),
    rating: Joi.number(),
    director: Joi.string(),
    genres: Joi.array().items(Joi.string()),
    actors: Joi.array().items(Joi.string()),
    users: Joi.array().items(Joi.string())
});

module.exports = { addFilmSchema, updateFilmSchema };