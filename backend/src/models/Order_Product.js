const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "Order_Product",
    {
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "Order_Product",
    }
  );
};
