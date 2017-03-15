// server/db/index.js uses the mysql npm module to connect to the database server running on your computer
let Sequelize = require('sequelize');
let Schema = require('../schema.sql');
let sequelize = new Sequelize('testing123', 'root', '');
// sequelize.sync().then(function() {
//   // TODO: remote below but test dummy data for our schema
//   return User.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
// }).then(function(jane) {
//   console.log(jane.get({
//     plain: true
//   }));
// });
// sequelize.sync().then(() => {
//   console.log('!!!!');

// });


sequelize.sync().then(success => {
    console.log('Db connection has been established successfully.');
  }, (err) => { 
    console.log('Unable to connect to the database:', err);
  });

module.exports.sequelize = sequelize;