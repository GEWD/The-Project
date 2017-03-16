const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const Member = connection.define('Member', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  auth: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = Member;
