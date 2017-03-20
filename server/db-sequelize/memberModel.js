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
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fb_id: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING,
  }
});

module.exports = Member;
