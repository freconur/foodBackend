const boom = require('@hapi/boom');
const axios = require('axios');
// import fetch from 'node-fetch'
// const fetch = require('node-fetch');
const { models } = require('../libs/sequelize');
const API_KEY = "bca4aa4ee42e49cca7cd396818b372ae";

class RecipeService {
    constructor() {}

    async create(data){
        const newRecipe = await models.Recipe.create(data);
        return newRecipe;
    }
    async getApiRickAndMorty() {
        const apiRAM = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`)
            const rpta = await apiRAM.data.results
            .map(recipe => {
                return {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                }
            })
            return rpta;
    }
    async getApiDb() {
        const recipes = await models.Recipe.findAll();
        return recipes;
    }
    async find(name){
        const rta = await this.getApiRickAndMorty(name);
        const rta1 = await this.getApiDb(name);
        const rta2 = rta.concat(rta1);
        return rta2;
        // const recipes = await models.Recipe.findAll();
        // return recipes;
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