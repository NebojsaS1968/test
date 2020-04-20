const Joi = require("joi");

const addUserSchema = Joi.object({
  name: Joi.string().required()
});

const addWatchSchema = Joi.object({
    name: Joi.string(),
    movies: Joi.array().items(Joi.string())
});

module.exports = { addUserSchema, addWatchSchema }