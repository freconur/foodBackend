// [ ] Receta con las siguientes propiedades:
// ID: *
// Nombre *
// Resumen del plato *
// Nivel de "comida saludable" (health score)
// Paso a paso
// [ ] Tipo de dieta con las siguientes propiedades:
// ID
// Nombre

const { Model, DataTypes, Sequelize } = require('sequelize');

const RECIPE_TABLE = 'recipe';

const RecipeSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    // autoIncrement: true,
    primaryKey: true,
  },
  // id: {
  //     allowNull: false,
  //     autoIncrement: true,
  //     primaryKey: true,
  //     type: DataTypes.INTEGER
  //   },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  stepToStep: {
    type: DataTypes.STRING,
  },
  healthScore: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Recipe extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: RECIPE_TABLE,
      modelName: 'Recipe',
      timestamps: false,
    };
  }
}

module.exports = { RecipeSchema, Recipe, RECIPE_TABLE };
