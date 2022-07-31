const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const description = Joi.string().min(20);
const stepToStep = Joi.string().min(20);

const createRecipeSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  stepToStep: stepToStep,
});

const updateRecipeSchema = Joi.object({
  name,
  description,
  stepToStep,
});

const getRecipeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRecipeSchema, updateRecipeSchema, getRecipeSchema };
