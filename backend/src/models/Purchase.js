const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "Purchase",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stripe_payment_id: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      stripe_payment_status: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
