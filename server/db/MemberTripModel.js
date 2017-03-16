const Sequelize = require('sequelize');
const connection = require('./dbConnect');

const memberTrip = connection.define('MemberTrip', {

});

module.exports = memberTrip;