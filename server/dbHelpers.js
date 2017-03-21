const mysql = require('mysql');
const mysqlConfig = require('./db-mysql/config.js');
const db = mysql.createConnection(mysqlConfig);

const queryString = {
  createNewUser: 'INSERT INTO\
                    members (name, auth)\
                    VALUES (?, ?)',
  createNewTrip: 'INSERT INTO trips (name, adminID)\
                    VALUES (?, (SELECT members.id FROM members\
                    WHERE members.name = ?));\
                  INSERT INTO trips_members (tripID, memberID)\
                    VALUES (LAST_INSERT_ID(),\
                           (SELECT trips.adminID FROM trips\
                           WHERE trips.id = LAST_INSERT_ID()));',

  addMembersToTrip: 'INSERT INTO trips_members (tripID, memberID)\
                      VALUES ((SELECT trips.id FROM trips\
                      WHERE trips.name = ? AND\
                            trips.adminID = (SELECT members.id\
                              WHERE members.name = ?)),\
                              (SELECT members.id FROM members\
                              WHERE members.name = ?));',
  addReceipt: 'INSERT INTO receipts (payorID, tripID, name, url, \
                sum_bill, sum_tax, sum_tax_tip) \
                  VALUES ((SELECT members.id FROM members \
                  WHERE members.id = ?), \
                          (SELECT trips.id FROM trips \
                          WHERE trips.id = ? \
                          AND trips.adminID = (SELECT members.id FROM members \
                          WHERE members.id = ?)), \
                          ?, ?, ?, ?, ?);',
  assignItem: '',

  getAllMembers: 'SELECT * FROM MEMBERS',
  getAllTrips: 'SELECT * FROM TRIPS;',
  getAllReceipts: 'SELECT * FROM RECEIPTS;',
  getAllItems: 'SELECT * FROM ITEMS;',
  getAllConsumedItems: 'SELECT * FROM CONSUMED_ITEMS;',
}

const createNewUser = (req, res) => {
  // Total 2 fields: USER_NAME and USER_AUTH from req.body
  db.query(queryString.createNewUser, twoFields, (err, result) => {
    if (err) {
      console.log('ERROR: createNewUsers in SQL', err);
    } else {
      console.log('SUCCESS: new user has been created.');
      res.send(result);
    }
  })
}

const createNewTrip = (req, res) => {
  // Total 2 fields: get name and ADMIN_NAME from req.body
  db.query(queryString.createNewTrip, twoFields, (err, result) => {
    if (err) {
      console.log('ERROR: createNewTrip in SQL', err);
    } else {
      console.log('SUCCESS: new trip has been created.');
      res.send(result);
    }
  })
}

const addMembersToTrip = (req, res) => {
  // Total 3 fields: get name, ADMIN_NAME and [MEMBER_ARRAY] from req.body
  // const dummyMembersArray = ['Aiden', 'Whitney', 'Eugene'];

  for (let i = 0; i < dummyMembersArray.length; i++) {
    db.query(queryString.addMembersToTrip, threeFields, (err, result) => {
      if (err) {
        console.log('ERROR: addMemberToTrip in SQL', err);
      } else {
        console.log('SUCCESS: new member has been added to the trip.')
        res.send(result);
      }
    })
  }
}

const addReceipt = (params,callback) => {
  // Total 8 fields: get PAYOR_NAME, name, PAYOR_NAME, RECEIPT_NAME, RECEIPT_URL, TOTAL_BILL, TOTAL_TAX, TOTAL_TAX_TIP from req.body
  db.query(queryString.addReceipt, params, (err, result) => {
    if (err) {
      console.log('ERROR: addReceipt in SQL', err);
    } else {
      callback(null,result);
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