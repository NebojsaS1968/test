const Joi = require("joi");

const addUserSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required()
});

const addWatchSchema = Joi.object({
    name: Joi.string(),
    movies: Joi.array().items(Joi.string()),
    grade: Joi.array().items(Joi.number()),
    movie: Joi.string()

});

module.exports = { addUserSchema, addWatchSchema }