const Sequelize = require('sequelize');
// const connection = require('./dbConnect');
const connection = new Sequelize('testing123', 'root', '');

const Item = connection.define('Item', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  receipt_id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Item;
