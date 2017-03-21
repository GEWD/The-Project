const mysql = require('mysql');
const mysqlConfig = require('./db-mysql/config.js');
const db = mysql.createConnection(mysqlConfig);

const queryString = {
  createNewUser: 'INSERT INTO members (name, auth) VALUES(?, ?)',
  createNewTrip: 'INSERT INTO trips (trip_name, admin_fk) VALUES(?, (SELECT members.id FROM members WHERE members.name=?)); INSERT INTO trips_members (trip_fk, member_fk) VALUES(LAST_INSERT_ID(), (SELECT trips.admin_fk FROM trips WHERE trips.id=LAST_INSERT_ID()));',

  addMemberToTrip: 'INSERT INTO trips_members (trip_fk, member_fk) VALUES((SELECT trips.id FROM trips WHERE trips.trip_name = ? AND trips.admin_fk = (SELECT members.id WHERE members.name = ?)), (SELECT members.id FROM members WHERE members.name = ?));',
  addReceipt: '',
  assignItem: '',

  getAllMembers: 'SELECT * FROM MEMBERS',
  getAllTrips: 'SELECT * FROM TRIPS;',
  getAllReceipts: 'SELECT * FROM RECEIPTS;',
  getAllItems: 'SELECT * FROM ITEMS;',
  getAllConsumedItems: 'SELECT * FROM CONSUMED_ITEMS;',
}

const createNewUser = (req, res) => {
  // get USER_NAME and USER_AUTH from req.body
  db.query(queryString.createNewUser, ['USER_NAME', 'USER_AUTH'], (err, result) => {
    if (err) {
      console.log('ERROR: createNewUsers in SQL', err);
    } else {
      console.log('SUCCESS: new user has been created.');
      res.send(result);
    }
  })
}

const createNewTrip = (req, res) => {
  // get TRIP_NAME and ADMIN_NAME from req.body
  db.query(queryString.createNewTrip, ['TRIP_NAME', 'ADMIN_NAME'], (err, result) => {
    if (err) {
      console.log('ERROR: createNewTrip in SQL', err);
    } else {
      console.log('SUCCESS: new trip has been created.');
      res.send(result);
    }
  })
}

const addMembersToTrip = (req, res) => {
  // get TRIP_NAME, ADMIN_NAME and [MEMBER_ARRAY]
  const dummyMembersArray = ['Aiden', 'Whitney', 'Eugene'];

  for (let i = 0; i < dummyMembersArray.length; i++) {
    db.query(queryString.addMembersToTrip, [dummyMembersArray[i]], (err, result) => {
      if (err) {
        console.log('ERROR: addMemberToTrip in SQL', err);
      } else {
        console.log('SUCCESS: new member has been added to the trip.')
        res.send(result);
      }
    })
  }
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
  db.query(queryString.assignItem, ['receipt_name', 'raw_px'], (err, result) => {

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
  createNewTrip,
  addMembersToTrip,
  addReceipt,
  assignItem,
  getAllUsers
}