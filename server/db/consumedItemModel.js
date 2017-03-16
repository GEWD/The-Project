const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const consumedItem = connection.define('consumedItem', {
  item_id: {
    type: Sequelize.INTEGER
  },
  consumer_id: {
    type: Sequelize.INTEGER
  },
  payor_id: {
    type: Sequelize.INTEGER
  },
  receipt_id: {
    type: Sequelize.INTEGER
  },
  trip_id: {
    type: Sequelize.INTEGER
  },
  paymentStatus: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = consumedItem;