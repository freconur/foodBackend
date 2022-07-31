'use strict';
const { DataTypes } = require('sequelize')
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  up: async (queryInterface) => {
    //le indicamos que ccolumna queremos modificar con la instruccion changecolumn
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      //para este caso haremos el cambio manualmente
      //pero ya no tenemos que agregar la references
      field: 'user_id',
      allowNull: false,
      //unique es lo que estamos agregando
      unique: true,// le indicamoas que el userId tiene que ser unico
      //como estamos usando el DataTypes tenemos que importar a sequelize
      type: DataTypes.INTEGER,
      });
  },

  down: async (queryInterface) => {
    // await queryInterface.drop(CUSTOMER_TABLE);
  }
};