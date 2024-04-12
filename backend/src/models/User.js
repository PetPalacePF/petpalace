const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
  dataBase.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Establecer el valor predeterminado como true
      },
      name: {
        type: DataTypes.STRING,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },

      country: {
        type: DataTypes.STRING,
      },

      state: {
        type: DataTypes.STRING,
      },

      city: {
        type: DataTypes.STRING,
      },

      street_address: {
        type: DataTypes.STRING,
      },

      street_number: {
        type: DataTypes.STRING,
      },

      ZIP_Code: {
        type: DataTypes.STRING,
      },

      phone: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
