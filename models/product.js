const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  // title: Sequelize.STRING,
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    allowNull: false,
    type: Sequelize.DOUBLE,
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});


module.exports = Product;
