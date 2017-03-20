const Sequelize = require('sequelize');
// const connection = require('./dbConnect');
const connection = new Sequelize('testing123', 'root', '');

const MemberTrip = connection.define('MemberTrip', {
});

module.exports = MemberTrip;