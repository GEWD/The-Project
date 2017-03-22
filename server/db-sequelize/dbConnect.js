const Sequelize = require('sequelize');
const connection = new Sequelize('testing123', 'root', '');
const Member = require('./memberModel');
const Trip = require('./tripModel');
const MemberTrip = require('./memberTripModel');
const Receipt = require('./receiptModel');
const Item = require('./ItemModel');

// connection.authenticate()
//   .then(function(err) {
//     console.log('connection has been established successfully');
//   }, function(err) {
//     console.log('unable to connect to database', err);
//   })

Member.create({
  name: 'user name',
  fb_id: '123455',
  token: '1239'
}).then(function(can) {
  console.log(can.get({
    plain: true
  }))
});
Member.sync();

Trip.create({
  name: 'Canada',
  admin: 'Gary'
}).then(function(gary) {
  console.log(gary.get({
    plain: true
  }))
});
Trip.sync();

Member.belongsToMany(Trip, { through: 'MemberTrip' });
Trip.belongsToMany(Member, { through: 'MemberTrip' });

MemberTrip.sync();
// connection.sync();



module.exports = connection;
