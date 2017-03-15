const Sequelize = require('sequelize');
// const connection = require('./dbConnect');
const connection = new Sequelize('testing123', 'root', '');

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
    unique: false
  }
});

module.exports = Member;