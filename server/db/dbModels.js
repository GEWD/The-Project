const connection = require('./dbConnect');
const Member = require('./memberModel');
const Trip = require('./tripModel');
const MemberTrip = require('./memberTripModel');
const Receipt = require('./receiptModel');
const Item = require('./ItemModel');

module.exports = {
  connection,
  Member,
  Trip
};


// Member.create({
//   name: 'Canada',
//   auth: '983420'
// }).then(function(can) {
//   console.log(can.get({
//     plain: true
//   }))
// });

// Trip.create({
//   name: 'Canada',
//   admin: 'Gary'
// }).then(function(gary) {
//   console.log(gary.get({
//     plain: true
//   }))
// });

// Member.sync();
// Trip.sync();
// MemberTrip.sync()



// Member.create({
//   name: 'Canada',
//   auth: '983420'
// }).then(function(can) {
//   console.log(can.get({
//     plain: true
//   }))
// });

// Trip.create({
//   name: 'Canada',
//   admin: 'Gary'
// }).then(function(gary) {
//   console.log(gary.get({
//     plain: true
//   }))
// });

// Member.sync();
// Trip.sync();
// MemberTrip.sync()

