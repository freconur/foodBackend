const express = require('express');
const router = express.Router();
const RecipeServices = require('../services/recipe.service');
const service = new RecipeServices();
const validatorHandler = require('../middlewares/validator.handler');
const {
  getRecipeSchema,
  createRecipeSchema,
  updateRecipeSchema,
} = require('../schemas/recipe.schema');

// router.get('/', async (req, res) => {
//   const recipes = await service.find();
//   res.status(200).json(recipes);
// });

//por query name
router.get('/', async (req, res, next) => {
  try {
    const {name} = req.query;
    const recipes = await service.find();
    if(name) {
      const nameFilter = await recipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
      console.log(nameFilter)
      nameFilter.length
          ? res.json(nameFilter)
          : res.status(404).send('name not found');
    }
    return res.json(recipes);
  } catch (error) {
    next(error);
  }

});
// router.get('/', async (req, res, next) => {
//   try {
//     const name = req.query.name;
//     const recipes = await service.find();
//     if (name) {
//       const nameFilter = await recipes.filter((item) => {
//         item.name.toLowerCase().includes(name.toLowerCase());
//         nameFilter.length
//           ? res.status(200).json(recipes)
//           : res.status(404).send('name not found');
//       });
//     }
//     res.status(200).json(recipes);

//   } catch (error) {
//     next(error);
//   }

//   res.status(200).json(recipes);
// });
router.get(
  '/:id',
  validatorHandler(getRecipeSchema, 'params'), // paramas es la propiedad que le pasamos a la funcion, y es la propiedad que es la que requerimos
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
  validatorHandler(createRecipeSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newRecipe = await service.create(body);
    res.status(201).json(newRecipe);
  }
);

router.patch(
  '/:id',
  validatorHandler(updateRecipeSchema, 'params'),
  validatorHandler(updateRecipeSchema, 'body'),
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

module.exports = router;
