const Joi = require('joi');

const id = Joi.string();
const title = Joi.string().min(3).max(100);
const description = Joi.string().min(20);
const stepToStep = Joi.string().max(200);
const healthScore = Joi.number().integer();

const createRecipeSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  stepToStep: stepToStep,
  healthScore: healthScore,
});

const updateRecipeSchema = Joi.object({
  title,
  description,
  stepToStep,
});

const getRecipeSchema = Joi.object({
  id: id,
});

module.exports = { createRecipeSchema, updateRecipeSchema, getRecipeSchema };
