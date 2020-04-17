const Joi = require("joi");

const addZanrSchema = Joi.object({
  name: Joi.string().required(),
  movies: Joi.array().items(Joi.string())
});

const updateZanrSchema = Joi.object({
    name: Joi.string(),
    movies: Joi.array().items(Joi.string())
});

module.exports = { addZanrSchema, updateZanrSchema }