const { DIET_RECIPE_TABLE, DietRecipeSchema } = require('../models/diet-recipe.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(DIET_RECIPE_TABLE, DietRecipeSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(DIET_RECIPE_TABLE);
  }
};
