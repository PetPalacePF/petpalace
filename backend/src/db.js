const { DB_DEPLOY } = require("./config");
const { Sequelize } = require("sequelize");
const AdminModel = require("./models/Admin");
const CategoryModel = require("./models/Category");
const OrderModel = require("./models/Order");
const ProductModel = require("./models/Product");
const PurchaseModel = require("./models/Purchase");
const UserModel = require("./models/User");
const Order_ProductModel = require("./models/Order_Product");

//? CONNECTION
const dataBase = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  //   dialectOptions:{
  //     ssl:{
  //       require: true,
  //     }
  // }

});

//* MODELS
AdminModel(dataBase);
CategoryModel(dataBase);
OrderModel(dataBase);
ProductModel(dataBase);
PurchaseModel(dataBase);
UserModel(dataBase);
Order_ProductModel(dataBase);

// ASSOCIATIONS
const { Admin, Category, Order, Product, Purchase, User } = dataBase.models;
// Product - Admin (n a n)
Admin.belongsToMany(Product, { through: "Admin_Product" });
Product.belongsToMany(Admin, { through: "Admin_Product" });
// Product - Category (n a n)
Category.belongsToMany(Product, { through: "Category_Product" });
Product.belongsToMany(Category, { through: "Category_Product" });

//Product - Order (n a n)
// Order.belongsToMany(Product, { through: "Order_Product" });
// Product.belongsToMany(Order, { through: "Order_Product" });

//Product - Order (n a n)
Order.belongsToMany(Product, {
  through: "Order_Product",
  foreignKey: "orderId",
  otherKey: "productId",
});
Product.belongsToMany(Order, {
  through: "Order_Product",
  foreignKey: "productId",
  otherKey: "orderId",
});

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
