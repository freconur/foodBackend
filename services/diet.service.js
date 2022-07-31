const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class DietService {
    constructor() {}

    async create(data){
        const newDiet= await models.Diet.create(data);
        return newDiet;
    }
    async find(){
        const diet = await models.Diet.findAll();
        return diet;
    }
    async findOne(id) {
        const diet = await models.Diet.findByPk(id);
        if(!diet) throw boom.notFound('recipe not found')
        return diet;
    }
    async update(id, changes) {
        const dietId = await this.findOne(id);
        if(!dietId) throw boom.notFound('recipe not found')
        const diet = await models.Diet.update(changes);
        return diet;
    }
    async delete(id) {
        const diet = await this.findOne(id);
        if(!diet) throw boom.notFound('recipe not found')
        await diet.destroy();
        return {id};
    }
}
module.exports= DietService;