const mysql = require('mysql');
const mysqlConfig = require('./db-mysql/config.js');
const db = mysql.createConnection(mysqlConfig);

const queryString = {
  getAllMembers: 'SELECT * FROM MEMBERS',
  getAllTrips: 'SELECT * FROM TRIPS',
  getAllReceipts: 'SELECT * FROM RECEIPTS',
  getAllItems: 'SELECT * FROM ITEMS',
  getAllConsumedItems: 'SELECT * FROM CONSUMED_ITEMS',

  createNewUser: 'INSERT INTO members (name, auth) VALUES (?, ?)'
  // createNewTrip: 'INSERT INTO trips (trip_name, admin)'
}

const createNewUser = (req, res) => {
  // get name and auth from req.body
  db.query(queryString.createNewUser, (err, result) => {
    if (err) {
      console.log('ERROR: createNewUsers in SQL', err);
    } else {
      res.send(result);
    }
  })
}

const getAllUsers = (req, res) => {
  db.query(queryString.getAllMembers, (err, result) => {
    if (err) {
      console.log('error querying db', err);
    } else {
      res.send(result);
    }
  })
}

module.exports = {
  createNewUser,
  getAllUsers
}