const { Model, DataTypes, Sequelize } = require('sequelize');
const { DIET_TABLE } = require('./diet.model')
const { RECIPE_TABLE } = require('./recipe.model')

const DIET_RECIPE_TABLE = 'diets_recipes';

const DietRecipeSchema = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    // id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    },
    // quiero enlazarme a un recipe
    dietId: {
      field: 'diet_id',
      allowNull: false,
      // type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      references: {
        model: DIET_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    recipeId: {
      field: 'recipe_id',
      allowNull: false,
      // type: DataTypes.INTEGER,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
      references: {
        model: RECIPE_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
  };
  
  class DietsRecipes extends Model {
    static associate(models) {}
    static config(sequelize) {
      return {
        sequelize,
        tableName: DIET_RECIPE_TABLE,
        modelName: 'DietsRecipes',
        timestamps: false,
      };
    }
  }
  
  module.exports = { DietsRecipes, DietRecipeSchema, DIET_RECIPE_TABLE };