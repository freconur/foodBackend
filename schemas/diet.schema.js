const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);

const createDietSchema = Joi.object({
  name: name.required(),
});

const updateDietSchema = Joi.object({
  name,
});

const getDietSchema = Joi.object({
  id: id.required(),
});

module.exports = { createDietSchema, updateDietSchema, getDietSchema };
