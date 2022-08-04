const boom = require('@hapi/boom');
const { default: axios } = require('axios');

const { models } = require('../libs/sequelize');
const API_KEY = "bca4aa4ee42e49cca7cd396818b372ae";
class DietService {
    constructor() {}

async getApiDiets() {
    const apiDiet = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`)
    const rpta = await apiDiet.data.results
    return rpta
}

    async create(data){
        const newDiet= await models.Diet.create(data);
        return newDiet;
    }
    async addItem(data){
        const newItem = await models.DietRecipe.create(data);
        return newItem;
    }
    async find(){
        const diet = await models.Diet.findAll();
        return diet;
    }
    async findOne(id) {
        const diet = await models.Diet.findByPk(id, {
            include: ['items']
        });
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