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
                              WHERE members.name = ?)));',
  settlePayment: '',

  getAllMembers: 'SELECT * FROM MEMBERS',
  getAllTrips: 'SELECT * FROM TRIPS;',
  getAllReceipts: 'SELECT * FROM RECEIPTS;',
  getAllItems: 'SELECT * FROM ITEMS;',
  getAllConsumedItems: 'SELECT * FROM CONSUMED_ITEMS;',
}

const parseSummaryData = (summary) => {
  // for (let i = 0; i < summary.items.length; i++) {
  //   for (let k = 0; k < summary.items[i].members.length; k++) {
  //     let itemObject = {};
  //     let summary = {
  //       tripName: summary.tripName,
  //       payor: summary.username,
  //       receiptName: summary.receiptName,
  //       url: summary.receiptUrl,
  //       items: [
  //         [
  //           itemObject.name: summary.items[i].name,
  //           itemObject.amount: summary.items[i].amount,
  //           itemObject.members: summary.items[i].members[k]
  //         ]
  //       ]
  //     };
  //   }
  // }
  // return summary;
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

  for (let i = 0; i < allItemsArray.length; i++) {
    for (let k = 0; k < params.items[i][0].members.length; k++) {
      // let eachItemName = params.items[i][0].name;
      // let eachConsumer = params.items[i][0].members[k];
      db.queryAsync(queryString.assignItemsToMembers, [params.items[i][0].name, params.receiptUrl, params.username, params.items[i][0].members[k], params.receiptUrl, params.username])
      .then( () => console.log('SUCCESS: assignItemsToMembers'));
    }
  }
  // return Promise.map(allItemsArray, (item, index) => {
  //   return Promise.map(memberArrayWithDupes, (member, index) => {

      // return db.queryAsync(queryString.assignItemsToMembers, [item, receiptUrl, payor, member, receiptUrl, adminName])
      // .then( () => console.log('SUCCESS: insert consumed_items'))
      // .catch( err => console.error('ERROR: insert consumed_items', err));
  //   })
  // })
}

const createMemberSummary = (params) => {
  console.log('----params passed down to Server here!!!!------', params);
  let tripName = params.tripName;

  // NEED: fb_id, name, email, token
  let adminName = params.username;
  let payor = params.username;
  let receiptName = params.receiptName;
  let receiptUrl = params.receiptUrl || `${receiptName}${adminName}`;
  let sumBill = Number(params.sumBill) || 0;
  let sumTax = Number(params.sumTax) || 0;
  let sumTip = Number(params.sumTip) || 0;

  // let itemSplitsArray = Object.keys(params.items_split); // ['split_1', 'split_2']
  // let allMembersArray = [];
  // for (let i = 0; i < itemSplitsArray.length; i++) {
    // allMembersArray = allMembersArray.concat(params.items_split[itemSplitsArray[i]].split.payees);
    // allMembersArray.concat(allMembersArray.concat(params.items_split[itemSplitsArray[i]].split.payees));
  // }
  // remote duplicates from array, just in case
  // let noDupeMemberArray = Array.from(new Set(allMembersArray));
  let memberArrayWithDupes = [].concat.apply([], params.members);
  let noDupeMemberArray = [].concat.apply([], params.members);
  noDupeMemberArray.shift();
  //   var arrays = [["$6"], ["$12"], ["$25"], ["$25"], ["$18"], ["$22"], ["$10"]];
  // var merged = [].concat.apply([], arrays);
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

  //addReceipt([payor, tripName, adminName, receiptName, receiptUrl, sumBill, sumTax, sumTip]);
  //storeReceiptItems([receiptUrl, receiptUrl, allItemsArray, allPricesArray, 'N/A']);

  // eachItemName, receiptUrl
  // payorName
  // each payeeName
  // receiptUrl
  // payorName

  // for (var i = 0; i < allItemsArray.length; i++) {
  //   for (var k = 0; k < params.items[i][0].members.length; k++)
  //     // var eachItemName = params.items[i][0].name;
  //     // var eachConsumer = params.items[i][0].members[k];

  //     // var eachParams = [params.items[i][0].name, receiptUrl, payor, params.items[i][0].members[k], receiptUrl, payor];
  //     db.query(queryString.assignItemsToMembers, [params.items[i][0].name, receiptUrl, payor, params.items[i][0].members[k], receiptUrl, payor], (err, result) => {
  //     if (err) {
  //       console.log('ERROR: assignItems in SQL', err);
  //     }
  //  //    else {
  //     //  res.send(result);
  //     // }
  //   })

  //     // assignItemsToMembers(['Candy', 'google.com/receipt01.jpg', 'Duy Nguyen', 'Gary', 'google.com/receipt01.jpg', 'Duy Nguyen']);
  //     // assignItemsToMembers([eachItemName, receiptUrl, payor, eachConsumer, receiptUrl, payor]);
  // }

  // // let allCommentsArray = [];
  // // for (let i = 0; i < itemSplitsArray.length; i++) {
  // //   allCommentsArray = allCommentsArray.concat(params.items_split[itemSplitsArray[i]].split.comment);
  // //   allCommentsArray.concat(allCommentsArray.concat(params.items_split[itemSplitsArray[i]].split.comment));
  // // }

  // // COMPLETE: add to members, trips and trips_members tables
  //  for (let i = 0; i < noDupeMemberArray.length; i++) {
  //    db.query(queryString.createNewUser, noDupeMemberArray[i]);
  //  let paramsAddMembersToTrip = [tripName, adminName, noDupeMemberArray[i]];
  //   db.query(queryString.addMembersToTrip, paramsAddMembersToTrip, (err, result) => {
  //     if (err) {
  //       console.log('ERROR: addMemberToTrip in SQL', err);
  //     } else {
  //       console.log('SUCCESS: new member has been added to the trip.')
  //       // res.send(result);
  //     }
  //   })
  // }
  // NEED: payorID, tripID, name, url, sumBill, sumTax, sumTaxTip
  // addReceipt([adminName, tripName, adminName, receiptName, receiptUrl, sumBill, sumTax, sumTaxTip]);
  // // NEED: receiptURL, receiptURL, eachItemName, rawPx, comment
  // storeReceiptItems([receiptUrl, receiptUrl, allItemsArray, allPricesArray, allCommentsArray]);

  // // itemName, receiptURL, payorName, payeeName, receiptUrl, adminName

  // assignItemsToMembers([allItemsArray, receiptUrl, payor, 'May', receiptUrl, adminName]);


  // const getPayeeItemsMatrix = (params) => {
  //   let matrix = {};
  //   let payeeName;
  //   let itemsList = [];
  //   for (let i = 0; i < itemSplitsArray.length; i++) {
  //     for (let k = 0; k < params.items_split[itemSplitsArray[i]].split.payees.length; k++)
  //       // itemsList = params.items_split[itemSplitsArray[i]].item;
  //       payeeName = params.items_split[itemSplitsArray[i]].split.payees[k];
  //       if (!matrix.payeeName) {
  //         matrix = {
  //           payeeName:
  //         }
  //       }
  //     // console.log('these are teh payees', payeeName);
  //       matrix = {
  //         [payeeName]: itemsList
  //       }
  //       // matrix.payeeName = params.items_split[itemSplitsArray[i]].item;
  //   }
  //   console.log('this is the matrix', matrix);
  //   return matrix;
  // }

  // assignItemsToMembers([allItemsArray, receiptUrl, payor, allMembersArray, receiptUrl, adminName]);
  // const queryStringInsertIntoConsumedItems = ``;

  // const queryStringCheckPayorView = ``
  // const queryStringCheckPayeeView = ``
  // return db.queryAsync(queryString.addReceipt, params)
  //   .then( result => {
  //     if (!result) {
  //       throw 'Failed in getting member summary.'
  //     }
  //   })
  //   .catch ( err => console.log('ERROR in getting member summary', err));
// }


// const assignItemsToMembers = (params) => {
//  // After gVision data is returned, data will be funneled and immediately be stored in 2 different tables: receipts and items table. Consumed_Items only references items table and info passed down from request headers.
//  // There are 2 fields from items table: itemID, receiptID,
//  // There are 3 fields from req.headers: payeeID(s), payorID (from fb_id), tripID (from trips.name);
//   console.log(params, '-----!!!-----');

//  // sequence: item_name, url, payor_auth, payee_auth, url, payor_auth
//  // const dummyPayorAuth = ['gary@gmail.com']; // always only 1 person
//  // const dummyReceiptURL = 'walmart.com';
//  // const dummyPayeeAuthItems = {
//  //  'jon@gmail.com': 'Burger',
//  //  'may@gmail.com': 'Burger'
//  // }
//   // db.query(queryString.assignItemsToMembers, params, (err, result) => {
//   //   if (err) {
//   //     console.log('error', err);
//   //   }
//   // })
//   // console.log('these are the params.....', params);

//   // [ [ 'Burger', 'Fries' ],
//   // 'google.com/receipt01.jpg',
//   // 'Jon',
//   // [ 'May', 'June' ],
//   // 'google.com/receipt01.jpg',
//   // 'Jon' ]
//  const payeeNames = Object.keys(params[0]);
//  for (let i = 0; i < payeeNames.length; i++) {
//     let queryArgs = [];
//    // let queryArgs = [dummyPayeeAuthItems[payeeNames[i]], dummyReceiptURL, dummyPayorAuth, payeeNames[i], dummyReceiptURL, dummyPayorAuth];
//    // console.log('--------------------------', queryArgs);
//    db.query(queryString.assignItemsToMembers, queryArgs, (err, result) => {
//      if (err) {
//        console.log('ERROR: assignItems in SQL', err);
//      }
//    //    else {
//      //  res.send(result);
//      // }
//    })
//  }
// }


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
  // assignItemsToMembers,
  settlePayment,
  createMemberSummary,
  getAllUsers
}
