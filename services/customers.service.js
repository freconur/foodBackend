const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {

  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    //primero le indicamos que crearemos el nuevo usuario usando el models de user le pasaremos el parametro a create de data.user por que es alli donde queremos que cree el usuario con segun nuestros schemas
    // const newUser = await models.User.create(data.user);
    //para hacer eso de forma automatica ya no creamos el data.user de manera aparte
    const newCustomer = await models.Customer.create(data, {
      //sequelize crea la anidacion de manera automatica por nosotros;
      include: ['user']
    });
    return newCustomer;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CustomerService;
