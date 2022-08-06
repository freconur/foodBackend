const Joi = require('joi');

// const id = Joi.number().integer();
const id = Joi.string();
const name = Joi.string().min(3).max(100);
const dietId = Joi.string()
const recipeId = Joi.string()
const createDietSchema = Joi.object({
  name: name.required(),
});

const updateDietSchema = Joi.object({
  name,
});

const getDietSchema = Joi.object({
  id: id.required(),
});
const addItemSchema = Joi.object({
  dietId: dietId.required(),
  recipeId: recipeId.required(),
});

module.exports = { addItemSchema, createDietSchema, updateDietSchema, getDietSchema };
