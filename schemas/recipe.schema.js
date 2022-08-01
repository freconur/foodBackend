const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().min(3).max(100);
const description = Joi.string().min(20);
const stepToStep = Joi.string().min(20);

const createRecipeSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  stepToStep: stepToStep,
});

const updateRecipeSchema = Joi.object({
  title,
  description,
  stepToStep,
});

const getRecipeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRecipeSchema, updateRecipeSchema, getRecipeSchema };
