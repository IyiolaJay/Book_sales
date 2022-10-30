const Sequelize = require("Sequelize");
const sequelize = require("../util/database");

const CartItem = sequelize.define("cart-item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
module.exports = CartItem;
