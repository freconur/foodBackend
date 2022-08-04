const Joi = require('joi');

const id = Joi.number().integer();
const dietId = Joi.number().integer();
const recipeId = Joi.string()
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

const addRecipeSchema = Joi.object({
  dietId: dietId.required(),
  recipeId: recipeId.required()
})
module.exports = { createDietSchema, updateDietSchema, getDietSchema, addRecipeSchema };
