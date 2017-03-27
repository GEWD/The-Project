const mysql = require('mysql');
const mysqlConfig = require('./db-mysql/config.js');
const db = mysql.createConnection(mysqlConfig);
const Promise = require('bluebird');

Promise.promisifyAll(db);

const queryString = {

  createNewUser: 'INSERT INTO\
                    members (name)\
                    VALUES (?)',

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
                            trips.adminID = (SELECT members.id FROM members \
                              WHERE members.name = ?)),\
                              (SELECT members.id FROM members\
                              WHERE members.name = ?));',

  addReceipt: 'INSERT INTO receipts (payorID, tripID, name, url, \
                sum_bill, sum_tax, sum_tip) \
                  VALUES ((SELECT members.id FROM members \
                  WHERE members.name = ?), \
                          (SELECT trips.id FROM trips \
                          WHERE trips.name = ? \
                          AND trips.adminID = (SELECT members.id FROM members \
                          WHERE members.name = ?)), \
                          ?, ?, ?, ?, ?);',
  storeReceiptItems: 'INSERT INTO items (receiptID, tripID, name, raw_price, comment) \
                        VALUES ((SELECT receipts.id from receipts \
                        WHERE receipts.url = ?), \
                                (SELECT receipts.tripID from receipts \
                                WHERE receipts.url = ?), \
                                ?, ?, ?);',
  assignItemsToMembers: 'INSERT INTO consumed_items (itemID, payorID, payeeID, \
                          receiptID, tripID) \
                            VALUES ((SELECT items.id FROM items \
                            WHERE items.name = ? \
                            AND items.receiptID = \
                              (SELECT receipts.id FROM receipts \
                              WHERE receipts.url = ?)), \
                              (SELECT members.id FROM members \
                              WHERE members.name = ?), \
                              (SELECT members.id FROM members \
                              WHERE members.name = ?), \
                              (SELECT receipts.id FROM receipts \
                              WHERE receipts.url = ?), \
                              (SELECT trips.id FROM trips \
                              WHERE trips.adminID = \
                              (SELECT members.id from members \
                              WHERE members.name = ?)\
                              AND trips.name = ?));',
  settlePayment: '',

  getAllMembers: 'SELECT * FROM MEMBERS',
  getAllTrips: 'SELECT * FROM TRIPS;',
  getAllReceipts: 'SELECT * FROM RECEIPTS;',
  getAllItems: 'SELECT * FROM ITEMS;',
  getAllConsumedItems: 'SELECT * FROM CONSUMED_ITEMS;',
}

const parseSummaryData = (summary) => {
}

const createNewUser = (userInfo) => {
  db.queryAsync(`SELECT * from members where fb_id = ?`, userInfo.fb_id)
    .then( user => {
      console.log('successful checked user');
      if(!user[0]) {
        db.queryAsync(`INSERT INTO members set ?`, userInfo)
      } else {
        console.log('user already exisit');
      }
    })
    .catch(err => console.error(err));
}

const createNewTrip = (params) => {
  console.log('createNewTrip!!!! params!!!!', params);
  // Total 2 fields: get name and ADMIN_NAME from req.body
  const queryCheckIfTripExist = `SELECT trips.id FROM trips WHERE trips.name = ? AND trips.adminID = (SELECT members.id FROM members
                    WHERE members.name = ?)`
  const queryStringCreateNewTrip = `INSERT INTO trips (name, adminID)
                    VALUES (?, (SELECT members.id FROM members
                    WHERE members.name = ?));`
  const queryStringInsertTripMembers = `INSERT INTO trips_members (tripID, memberID)
                    VALUES ( LAST_INSERT_ID(),
                    (SELECT trips.adminID FROM trips
                    WHERE trips.id = LAST_INSERT_ID()));`
  return db.queryAsync(queryCheckIfTripExist, params)
    .then( result => {
      if (result[0]) {
        throw 'Trip already exist!';
      }
    })
    .then( () => db.queryAsync(queryStringCreateNewTrip, params))
    .then( () => db.queryAsync(queryStringInsertTripMembers))
    .catch( err => console.error('ERROR: createNewTrip in SQL', err) );
}

const addMembersToTrip = (params) => {
  // Total 3 fields: get TRIP_NAME, ADMIN_NAME and [MEMBER_ARRAY] from req.body
  let tripName = params.tripName;
  let adminName = params.adminName;
  let membersArray = params.noDupeMemberArray;

  console.log('addMembersToTrip!!!!!!! PARAMS!!!', params);

  const queryMemberId = `SELECT members.id FROM members WHERE members.name = ?`;
  const addMembersToTrip = `INSERT INTO trips_members (tripID, memberID) VALUES ((SELECT trips.id FROM trips
                      WHERE trips.name = ?), ?)`;

  return Promise.map(membersArray, (member) => {
    return db.queryAsync(queryMemberId, member)
      .then(result => {
        if (result[0]) {
          console.log('member already exisit and id is=============', result[0].id);
          return db.queryAsync(addMembersToTrip, [tripName, result[0].id ])
        } else {
          return db.queryAsync(queryString.createNewUser, member)
          .then( () => {
              db.queryAsync(queryMemberId, member)
              .then( (memberId) => db.queryAsync(addMembersToTrip, [tripName, memberId[0].id]))
            }
          )
        }
    })
    .then( () => console.log('SUCCESS: new member has been added to the trip.'))
    .catch(err => console.error('ERROR: addMemberToTrip in SQL', err));
  })
}

const addReceipt = (params) => {
  // Total 8 fields: get PAYOR_AUTH, TRIP_NAME, PAYOR_AUTH, RECEIPT_NAME, RECEIPT_URL, TOTAL_BILL, TOTAL_TAX, TOTAL_TAX_TIP from req.body
  console.log('addReceipt PARAMSSS!!!!', params);
  return db.queryAsync(queryString.addReceipt, params)
    .then( (result) => console.log('successful insert into addReceipt'))
    .catch( err => console.error('SQL ERROR in addReceipt', err));
}

const storeReceiptItems = ({receiptUrl, allItemsArray, allPricesArray}) => {
  // Total 4 fields from req.headers: get RECEIPT_URL, RECEIPT_URL, [ITEM NAMES], RAW_PX
  return Promise.map(allItemsArray, (item, index) => {
    return  db.queryAsync(queryString.storeReceiptItems, [receiptUrl, receiptUrl, item, allPricesArray[index], 'N/A' ])
      .then( () => console.log('SUCCESS: insert storeReceiptItems'))
      .catch(err => console.error('SQL ERROR in storeReceiptItems', err));
  })
}

const assignItemsToMembers = (allItemsArray, params) => {
  console.log('assignItemsToMembers------', JSON.stringify(params));

  let allConsumers = [];
  let allItems = [];

  for (let i = 0; i < allItemsArray.length; i++) {
    for (let k = 0; k < params.items[i][0].members.length; k++) {

      while (k !== params.items[i][0].members.length) {
        allConsumers.push(params.items[i][0].members[k]);
        allItems.push(params.items[i][0].name);
        k++;
      }
    }
  }
  console.log('allitems----------------', allItems);
  console.log('consumers----------------',allConsumers);
  console.log('url and username -----', params.receiptUrl, params.username);
  // return Promise.map(allItems, (item, index) => {
  //   return Promise.map(allConsumers, (consumer, index) => {
    for (let i = 0; i < allItems.length; i++) {
        db.query(queryString.assignItemsToMembers, [
          allItems[i],
          params.receiptUrl,
          params.username,
          allConsumers[i],
          params.receiptUrl,
          params.username,
          params.tripName
        ])
        // return db.queryAsync(queryString.assignItemsToMembers, [allItems[i], params.receiptUrl, params.username, allConsumers[j], params.receiptUrl, params.username])
        // .then( () => console.log('SUCCESS: assignItemsToMembers'))
        // .catch( err => console.error('ERROR: insert consumed_items', err));   
    }
}

const createMemberSummary = (params) => {
  console.log('----params passed down to Server here!!!!------', params);
  let tripName = params.tripName;
  // NEED: fb_id, name, email, token
  let adminName = params.username;
  let payor = params.username;
  let receiptName = params.receiptName;
  params.receiptUrl = params.receiptUrl || `${receiptName}${adminName}`;
  let receiptUrl = params.receiptUrl;
  let sumBill = Number(params.sumBill) || 0;
  let sumTax = Number(params.sumTax) || 0;
  let sumTip = Number(params.sumTip) || 0;
  let memberArrayWithDupes = [].concat.apply([], params.members);
  let noDupeMemberArray = [].concat.apply([], params.members);
  noDupeMemberArray.shift();
  let allItemsArray = [];
  for (let i = 0; i < params.items.length; i++) {
    allItemsArray.push(params.items[i][0].name);
  }

  let allPricesArray = [];
  for (let i = 0; i < params.items.length; i++) {
    allPricesArray.push(params.items[i][0].amount);
  }

  createNewTrip([tripName, adminName])
  .then( () => {
    return addMembersToTrip({
      tripName: tripName,
      adminName: adminName,
      noDupeMemberArray: noDupeMemberArray
    })
    .then( () => {
      return addReceipt([payor, tripName, adminName, receiptName, receiptUrl, sumBill, sumTax, sumTip]);
    })
    .then( () => {
      return storeReceiptItems({
        receiptUrl: receiptUrl,
        allItemsArray: allItemsArray,
        allPricesArray: allPricesArray
      });
    })
    .then ( () => {
      return assignItemsToMembers(allItemsArray, params);
    })
  })
  .catch( err => console.error('ERROR: createMemberSummary', err));
}

const settlePayment = (req, res) => {

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
  storeReceiptItems,
  assignItemsToMembers,
  settlePayment,
  createMemberSummary,
  getAllUsers
}
