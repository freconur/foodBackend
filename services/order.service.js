const boom = require('@hapi/boom');
const { database } = require('faker/lib/locales/en');
const { models } = require('../libs/sequelize')

class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await models.Orders.create(data);
    return newOrder;
  }
  async addItem(data) {
    const newItem = await models.OrdersProducts.create(data);
    return newItem;
  }
  async find() {
    return [];
  }

  async findOne(id) {
    const order = await models.Orders.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
  }
  
  

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
