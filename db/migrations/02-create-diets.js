const { DIET_TABLE, DietSchema } = require('../models/diet.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(DIET_TABLE, DietSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(DIET_TABLE);
  }
};

