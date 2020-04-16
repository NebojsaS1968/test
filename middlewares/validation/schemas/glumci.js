const Joi = require("joi");

const addActorSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  awards: Joi.array().items(Joi.string()).required()

});

const updateActorSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number(),
    awards: Joi.array().items(Joi.string()),
    movies: Joi.array().items(Joi.string())
});

module.exports = { addActorSchema, updateActorSchema }