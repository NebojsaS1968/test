const Joi = require("joi");

const addUserSchema = Joi.object({
  username: Joi.string().required().min(3).max(20),
  password: Joi.string().required().min(6),
  password2: Joi.string().required().min(6),
  email: Joi.string().required().email()
});

const addWatchSchema = Joi.object({
    name: Joi.string(),
    movies: Joi.array().items(Joi.string()),
    grade: Joi.number(),
    movie: Joi.string()
});

module.exports = { addUserSchema, addWatchSchema }