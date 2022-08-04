
const { Model, DataTypes, Sequelize } = require('sequelize');
const { RECIPE_TABLE } = require('./recipe.model')
const { DIET_TABLE } = require('./diet.model')

const DIET_RECIPE_TABLE = 'diets_recipes';
const DietRecipeSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    // autoIncrement: true,
    primaryKey: true,
  },

  //quiero enlazarme a un recipe
  recipeId: {
    field: 'recipe_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: RECIPE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  dietId: {
    field: 'diet_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: DIET_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
};

class DietRecipe extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: DIET_RECIPE_TABLE,
      modelName: 'DietRecipe',
      timestamps: false,
    };
  }
}

module.exports = { DietRecipe, DietRecipeSchema, DIET_RECIPE_TABLE };