const Joi = require("joi");

const dodajFilmSchema = Joi.object({
  title: Joi.string().required(),
  plot: Joi.string().required(),
  year: Joi.number().required(),
  rating: Joi.number().required(),
  director: Joi.string().required(),
  genres: Joi.array().items(Joi.string()).required()
});

const izmeniFilmSchema = Joi.object({
    title: Joi.string(),
    plot: Joi.string(),
    year: Joi.number(),
    rating: Joi.number(),
    director: Joi.string(),
    genres: Joi.array().items(Joi.string())
});

module.exports = { dodajFilmSchema, izmeniFilmSchema };