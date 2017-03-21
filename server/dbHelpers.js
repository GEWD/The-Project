const mysql = require('mysql');
const mysqlConfig = require('./db-mysql/config.js');
const db = mysql.createConnection(mysqlConfig);

const queryString = {
  createNewUser: 'INSERT INTO members (name, auth)\
                    VALUES(?, ?)',
  // createNewTrip: 'INSERT INTO trips (trip_name, admin_fk)\
  //                   VALUES(?, (SELECT members.id FROM members WHERE members.name = ?));\
  //                 INSERT INTO trips_members (trips_fk, members_fk)\
  //                   VALUES((SELECT trips.id FROM trips), ());',
  createNewTrip: 'INSERT INTO trips (trip_name, admin_fk)\
                    VALUES(?, (SELECT members.id FROM members WHERE members.name = ?));',
  addMemberToTrip: '',
  addReceipt: '',
  assignItem: '',
  getAllMembers: 'SELECT * FROM MEMBERS',
  getAllTrips: 'SELECT * FROM TRIPS;',
  getAllReceipts: 'SELECT * FROM RECEIPTS;',
  getAllItems: 'SELECT * FROM ITEMS;',
  getAllConsumedItems: 'SELECT * FROM CONSUMED_ITEMS;',
}

const createNewUser = (req, res) => {
  // get name and auth from req.body
  db.query(queryString.createNewUser, ['USER_NAME', 'USER_AUTH'], (err, result) => {
    if (err) {
      console.log('ERROR: createNewUsers in SQL', err);
    } else {
      res.send(result);
    }
  })
}

const createNewTrip = (req, res) => {
  // get admin name from req.body
  db.query(queryString.createNewTrip, ['TRIP_NAME', 'USER_NAME'], (err, result) => {
    if (err) {
      console.log('ERROR: createNewTrip in SQL', err);
    } else {
      res.send(result);
    }
  })
}

const addMemberToTrip = (req, res) => {

}

const addReceipt = (req, res) => {
  db.query(queryString.addReceipt, ['receipt_name', 'receipt.jpg', '100', '10', '25'], (err, result) => {
    if (err) {
      console.log('ERROR: addReceipt in SQL', err);
    } else {
      res.send(result);
    }
  })
}

const assignItem = (req, res) => {

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
  createNewTrip,
  addMemberToTrip,
  addReceipt,
  assignItem,
  getAllUsers
}