const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
