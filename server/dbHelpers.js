const mysql = require('mysql');
const mysqlConfig = require('./db-mysql/config.js');
const db = mysql.createConnection(mysqlConfig);
const Promise = require('bluebird');

Promise.promisifyAll(db);

const queryString = {

  createNewUser: 'INSERT INTO\
                    members (name, auth)\
                    VALUES (?, ?)',

  createNewTrip: 'INSERT INTO trips (name, adminID)\
                    VALUES (?, (SELECT members.id FROM members\
                    WHERE members.auth = ?));\
                  INSERT INTO trips_members (tripID, memberID)\
                    VALUES (LAST_INSERT_ID(),\
                           (SELECT trips.adminID FROM trips\
                           WHERE trips.id = LAST_INSERT_ID()));',

  addMembersToTrip: 'INSERT INTO trips_members (tripID, memberID)\
                      VALUES ((SELECT trips.id FROM trips\
                      WHERE trips.name = ? AND\
                            trips.adminID = (SELECT members.id FROM members \
                              WHERE members.auth = ?)),\
                              (SELECT members.id FROM members\
                              WHERE members.auth = ?));',

  addReceipt: 'INSERT INTO receipts (payorID, tripID, name, url, \
                sum_bill, sum_tax, sum_tax_tip) \
                  VALUES ((SELECT members.id FROM members \
                  WHERE members.auth = ?), \
                          (SELECT trips.id FROM trips \
                          WHERE trips.name = ? \
                          AND trips.adminID = (SELECT members.id FROM members \
                          WHERE members.auth = ?)), \
                          ?, ?, ?, ?, ?);',
  storeReceiptItems: 'INSERT INTO items (receiptID, tripID, name, raw_price) \
                        VALUES ((SELECT receipts.id from receipts \
                        WHERE receipts.url = ?), \
                                (SELECT receipts.tripID from receipts \
                                WHERE receipts.url = ?), \
                                ?, ?);',
  assignItemsToMembers: 'INSERT INTO consumed_items (itemID, payorID, payeeID, \
                          receiptID, tripID) \
                            VALUES ((SELECT items.id FROM items \
                            WHERE items.name = ? \
                            AND items.receiptID = \
                              (SELECT receipts.id FROM receipts \
                              WHERE receipts.url = ?)), \
                              (SELECT members.id FROM members \
                              WHERE members.auth = ?), \
                              (SELECT members.id FROM members \
                              WHERE members.auth = ?), \
                              (SELECT receipts.id FROM receipts \
                              WHERE receipts.url = ?), \
                              (SELECT trips.id FROM trips \
                              WHERE trips.adminID = \
                              (SELECT members.id from members \
                              WHERE members.auth = ?)));',
  settlePayment: '',

  getAllMembers: 'SELECT * FROM MEMBERS',
  getAllTrips: 'SELECT * FROM TRIPS;',
  getAllReceipts: 'SELECT * FROM RECEIPTS;',
  getAllItems: 'SELECT * FROM ITEMS;',
  getAllConsumedItems: 'SELECT * FROM CONSUMED_ITEMS;',
}


const createNewUser = (userInfo) => {

  db.queryAsync(`SELECT * from members where fb_id = ?`, userInfo.fb_id)
    .then(function(user) {
      console.log('successful checked user');
      if(!user[0]) {
        db.queryAsync(`INSERT INTO members set ?`, userInfo)
      } else {
        console.log('user already exisit');
      }
    })
    .catch(function(err) {
      console.error(err);
    })
}

const createNewTrip = (req, res) => {
  // Total 2 fields: get name and ADMIN_NAME from req.body
  db.query(queryString.createNewTrip, [twoFields], (err, result) => {
    if (err) {
      console.log('ERROR: createNewTrip in SQL', err);
    } else {
      console.log('SUCCESS: new trip has been created.');
      res.send(result);
    }
  })
}

const addMembersToTrip = (req, res) => {
  // Total 3 fields: get TRIP_NAME, ADMIN_NAME and [MEMBER_ARRAY] from req.body
  const dummyMembersArray = ['May', 'Jon'];

  for (let i = 0; i < dummyMembersArray.length; i++) {
    db.query(queryString.addMembersToTrip, ['Canada2016', 'June', dummyMembersArray[i]], (err, result) => {
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
  // Total 8 fields: get PAYOR_AUTH, TRIP_NAME, PAYOR_AUTH, RECEIPT_NAME, RECEIPT_URL, TOTAL_BILL, TOTAL_TAX, TOTAL_TAX_TIP from req.body
  db.query(queryString.addReceipt, [eightFields], (err, result) => {
    if (err) {
      console.log('ERROR: addReceipt in SQL', err);
    } else {
      res.send(result);
    }
  })
}

const storeReceiptItems = (req, res) => {
  // Total 4 fields from req.headers: get RECEIPT_URL, RECEIPT_URL, [ITEM NAMES], RAW_PX
  const dummyReceiptURL = 'google.com';
  const dummyItemNames = ['Beef', 'Chicken', 'Pork'];
  const dummyItemRawPrices = [3, 2, 5];

  if (dummyItemNames.length === dummyItemRawPrices.length) {
    for (let i = 0; i < dummyItemNames.length; i++) {
      db.query(queryString.storeReceiptItems, [ dummyReceiptURL, dummyReceiptURL, dummyItemNames[i], dummyItemRawPrices[i]], (err, result) => {
        if (err) {
          console.log('ERROR: storeItem in SQL', err);
        } else {
          res.send(result);
        }
      })
    }
  }
}

const assignItemsToMembers = (req, res) => {
  // After gVision data is returned, data will be funneled and immediately be stored in 2 different tables: receipts and items table. Consumed_Items only references items table and info passed down from request headers.
  // There are 2 fields from items table: itemID, receiptID,
  // There are 3 fields from req.headers: payeeID(s), payorID (from members.auth), tripID (from trips.name);

  // sequence: item_name, url, payor_auth, payee_auth, url, payor_auth
  const dummyPayorAuth = ['gary@gmail.com']; // always only 1 person
  const dummyReceiptURL = 'google.com';
  const dummyPayeeAuthItems = {
    'jon@gmail.com': 'Burger',
    'may@gmail.com': 'Burger'
  }
  const payeeAuths = Object.keys(dummyPayeeAuthItems);

  for (let i = 0; i < payeeAuths.length; i++) {
    let queryArgs = [dummyPayeeAuthItems[payeeAuths[i]], dummyReceiptURL, dummyPayorAuth, payeeAuths[i], dummyReceiptURL, dummyPayorAuth];
    // console.log('--------------------------', queryArgs);
    db.query(queryString.assignItemsToMembers, queryArgs, (err, result) => {
      if (err) {
        console.log('ERROR: assignItems in SQL', err);
      } else {
        res.send(result);
      }
    })
  }
}

const settlePayment = (req, res) => {

};

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
  storeReceiptItems,
  assignItemsToMembers,
  settlePayment,
  getAllUsers
}
