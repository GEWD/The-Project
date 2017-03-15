// server/db/index.js uses the mysql npm module to connect to the database server running on your computer
var Sequelize = require('sequelize');
// without password and options
let sequelize = new Sequelize('testing123', 'username', 'password', {
  dialect: 'mysql',
  port: '3000' // CHECK: '3306' for mysql?
});

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Db connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

module.exports.sequelize = sequelize;