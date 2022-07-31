const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class RecipeService {
    constructor() {}

    async create(data){
        const newRecipe = await models.Recipe.create(data);
        return newRecipe;
    }
    async find(){
        const recipes = await models.Recipe.findAll();
        return recipes;
    }
    async findOne(id) {
        const recipe = await models.Recipe.findByPk(id);
        if(!recipe) throw boom.notFound('recipe not found')
        return recipe;
    }
    async update(id, changes) {
        const recipeId = await this.findOne(id);
        if(!recipeId) throw boom.notFound('recipe not found')
        const recipe = await models.Recipe.update(changes);
        return recipe;
    }
    async delete(id) {
        const recipe = await this.findOne(id);
        if(!recipe) throw boom.notFound('recipe not found')
        await recipe.destroy();
        return {id};
    }
}
module.exports= RecipeService;