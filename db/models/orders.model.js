const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model')
const ORDERS_TABLE = 'orders';

const OrdersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    // unique: true,// le indicamoas que el userId tiene que ser unico
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Orders extends Model {
    static associate(models) {
        this.belongsTo(models.Customer, {as: 'customer'})
        this.belongsToMany(models.Product, {
          as: 'items',
          //le tenemos que decir cual va ser la tabla ternearia la cual va resolver la relacion mucos a muchos
          through: models.OrdersProducts,
          foreignKey: 'orderId',
          otherKey: 'productId'
        })
    }
  
    static config(sequelize) {
      return {
        sequelize,
        tableName: ORDERS_TABLE,
        modelName: 'Orders',
        timestamps: false
      }
    }
  }

module.exports= {ORDERS_TABLE, Orders, OrdersSchema}