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
      cantidad: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
