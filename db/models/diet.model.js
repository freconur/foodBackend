// [ ] Tipo de dieta con las siguientes propiedades:
// ID
// Nombre

const { Model, Sequelize, DataTypes } = require('sequelize');

const DIET_TABLE = 'diet';

const DietSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    // autoIncrement: true,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW,
  },
};

class Diet extends Model {
    static associate(models){
      this.belongsToMany(models.Recipe, {
        //tenemos que decirle que a traves de que tabla va resolver la relacion
        as:'items',
        through: models.DietRecipe,
        foreignKey: 'dietId',  
        otherKey: 'recipeId'
      })
    }
    static config(sequelize){
        return {
            sequelize,
            tableName: DIET_TABLE,
            modelName: 'Diet',
            timestamps: false
        }
    }
}

module.exports= { Diet, DietSchema, DIET_TABLE}
