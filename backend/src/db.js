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
const dataBase = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${HOST}:${PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

//* MODELS
AdminModel(dataBase);
CategorieModel(dataBase);
OrderModel(dataBase);
ProductModel(dataBase);
PurchaseModel(dataBase);
UserModel(dataBase);

// ASSOCIATIONS
const { Admin, Categorie, Order, Product, Purchase, User } = dataBase.models;
// Product - Admin (n a n)
Admin.belongsToMany(Product, { through: "Admin_Product" });
Product.belongsToMany(Admin, { through: "Admin_Product" });
// Product - Categorie (n a n)
Categorie.belongsToMany(Product, { through: "Categorie_Product" });
Product.belongsToMany(Categorie, { through: "Categorie_Product" });

//Product - Order (n a n)
Order.belongsToMany(Product, { through: "Order_Product" });
Product.belongsToMany(Order, { through: "Order_Product" });

// Orders - User (n a 1)
Order.belongsTo(User);
User.hasMany(Order);

// Orders - Purchase (n a 1)
Order.belongsTo(Purchase);
Purchase.hasMany(Order);

// Purchase - User (n a 1)
Purchase.belongsTo(User);
User.hasMany(Purchase);

module.exports = {
  dataBase,
  ...dataBase.models,
};
