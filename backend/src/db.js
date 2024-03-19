require("dotenv").config();
const { DB_USER, DB_PASSWORD, HOST, PORT, DB_NAME } = process.env;
const { Sequelize } = require("sequelize");
const AdminModel = require("./models/Admin");
const CategorieModel = require("./models/Categorie");
const OrderModel = require("./models/Order");
const ProductModel = require("./models/Product");
const PurchaseModel = require("./models/Purchase");
const UserModel = require("./models/User");


//? CONNECTION
const dataBase = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${PORT}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});

//* MODELS
AdminModel(dataBase);
CategorieModel(dataBase);
OrderModel(dataBase);
ProductModel(dataBase);
PurchaseModel(dataBase);
UserModel(dataBase);

// ASSOCIATIONS
const { Admin, Categorie, Order, Product, Purchase, User } = dataBase.models;
// Admin - Product
Admin.belongsToMany(Product, {through: "Admin_Product"});
Product.belongsToMany(Admin, {through: "Admin_Product"});
// Categorie - Product
Categorie.belongsToMany(Product, {through: "Categorie_Product"});
Product.belongsToMany(Categorie, {through: "Categorie_Product"});
// Order - Product
Order.belongsToMany(Product, {through: "Order_Product"});
Product.belongsToMany(Order, {through: "Order_Product"});
// Purchase - Product
Purchase.belongsToMany(Product, {through: "Purchase_Product"});
Product.belongsToMany(Purchase, {through: "Purchase_Product"});
// User - Product
User.belongsToMany(Product, {through: "User_Product"});
Product.belongsToMany(User, {through: "User_Product"});
// User - Order (1 a n)
Order.belongsTo(User, { foreignKey: 'userId' }); 
User.hasMany(Order, { foreignKey: 'userId' }); 
// User - Purchase (1 a n)
Purchase.belongsTo(User, { foreignKey: 'userId' }); 
User.hasMany(Purchase, { foreignKey: 'userId' }); 
// Purchase - Order (1 a n)
Order.belongsTo(Purchase, { foreignKey: 'purchaseId' }); 
Purchase.hasMany(Order, { foreignKey: 'purchaseId' }); 


module.exports = {
  dataBase,           
  ...dataBase.models 
       
};