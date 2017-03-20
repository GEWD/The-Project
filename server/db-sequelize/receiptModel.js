const Sequelize = require('sequelize');
// const connection = require('./dbConnect');
const connection = new Sequelize('testing123', 'root', '');

const Receipt = connection.define('Receipt', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  payor_id: {
    type: Sequelize.INTEGER
  },
  trip_id: {
    type: Sequelize.INTEGER
  },
  pool_id: {
    type: Sequelize.INTEGER
  },
  image: {
    type: Sequelize.STRING
  },
  total: {
    type: Sequelize.INTEGER
  },
  totalTax: {
    type: Sequelize.INTEGER
  },
  totalTaxTim: {
    type: Sequelize.INTEGER
  }
});

module.exports = Receipt;
