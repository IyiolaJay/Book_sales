const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem', {
    id: {
        primaryKey: true,
        autoIncrement : true,
        allowNull : false,
        type : Sequelize.INTEGER,
        unique : true
    },
    qty : Sequelize.INTEGER
})

module.exports = OrderItem;