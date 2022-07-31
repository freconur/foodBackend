const express = require('express');
const router = express.Router();
const DietServices = require('../services/diet.service');
const service = new DietServices();
const validatorHandler = require('../middlewares/validator.handler');
const {
  getDietSchema,
  createDietSchema,
  updateDietSchema
} = require('../schemas/diet.schema');

router.get('/', async (req, res) => {
  const recipes = await service.find();
  res.status(200).json(recipes);
});
router.get(
  '/:id',
  validatorHandler(getDietSchema, 'params'), // paramas es la propiedad que le pasamos a la funcion, y es la propiedad que es la que requerimos
  async (req, res, next) => {
    // observamos que en si esto es un middleware, asi que lo trataremos como cual, le daremos un middleware antes de que se ejecute el ya recibe los parametros finales
    try {
      const { id } = req.params;
      const recipes = await service.findOne(id);
      res.json(recipes);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
    '/',
    validatorHandler(createDietSchema, 'body'),
    async (req, res) => {
      const body = req.body;
      const newRecipe = await service.create(body);
      res.status(201).json(newRecipe);
    }
  );
  router.patch(
    '/:id',
    validatorHandler(updateDietSchema, 'params'),
    validatorHandler(updateDietSchema, 'body'),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const body = req.body;
        const recipteUdapte = await service.update(id, body);
        res.json(recipteUdapte);
      } catch (error) {
        next(error);
      }
    }
  );
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deleteRecipe = await service.delete(id);
    res.json(deleteRecipe);
  });

  module.exports=router;
