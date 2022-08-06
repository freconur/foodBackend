const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category,CategorySchema } = require('./category.model')
const { Product,ProductSchema } = require('./product.model')
const { Orders, OrdersSchema } = require('./orders.model')
const { OrdersProducts, OrdersProductsSchema } = require('./order-product.model')
const { Recipe, RecipeSchema } = require('./recipe.model')
const { Diet, DietSchema } = require('./diet.model')
const { DietsRecipes, DietRecipeSchema } = require('./diet-recipe.model')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Orders.init(OrdersSchema, Orders.config(sequelize));
  OrdersProducts.init(OrdersProductsSchema, OrdersProducts.config(sequelize));
  Recipe.init(RecipeSchema, Recipe.config(sequelize));
  Diet.init(DietSchema, Diet.config(sequelize));
  DietsRecipes.init(DietRecipeSchema, DietsRecipes.config(sequelize));

  //aquie hacemos las asociaciones
  Customer.associate(sequelize.models);
  User.associate(sequelize.models)
  Category.associate(sequelize.models)
  Product.associate(sequelize.models)
  Orders.associate(sequelize.models)
  Diet.associate(sequelize.models)
  Recipe.associate(sequelize.models)
}

module.exports = setupModels;
