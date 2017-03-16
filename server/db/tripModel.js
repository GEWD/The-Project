const Sequelize = require('sequelize');
// const connection = require('./dbConnect');
const connection = new Sequelize('testing123', 'root', '');

const Trip = connection.define('Trip', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  admin: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Trip;
