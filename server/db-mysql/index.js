const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllUsers = (req, res) => {
  connection.query('SELECT * FROM users', function (err, result) {
    if (err) {
      console.log('error querying db', err);
    } else {
      res.send(result);
    }
  })
}

module.exports.getAllUsers = getAllUsers;