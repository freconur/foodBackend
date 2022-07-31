const { OrdersSchema, ORDERS_TABLE } = require('./../models/orders.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDERS_TABLE, OrdersSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDERS_TABLE);
  }
};