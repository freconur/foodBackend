const { RECIPE_TABLE, RecipeSchema } = require('../models/recipe.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(RECIPE_TABLE, RecipeSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(RECIPE_TABLE);
  }
};
