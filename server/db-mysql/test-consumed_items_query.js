  // After gVision data is returned, data will be funneled and immediately be stored in 3 different tables: 1) receipts, 2) items and 3) consumed_items.
  // There are 1 fields from items table: itemID (i.e. LAST_INSERT_ID())
  // There are 4 fields from req.headers: payeeID(s), payorID (from members.auth), receiptID, tripID (from trips.name)

  // INSERT INTO consumed_items (itemID, payorID, payeeID, receiptID, tripID) VALUES ((SELECT items.id FROM items WHERE items.name = 'Burger' AND items.receiptID = (SELECT receipts.id FROM receipts WHERE receipts.url = 'google.com')), (SELECT members.id FROM members WHERE members.auth = 'gary@gmail.com'), (SELECT members.id FROM members WHERE members.auth = 'jon@gmail.com'), (SELECT receipts.id FROM receipts WHERE receipts.url = 'google.com'), (SELECT trips.id FROM trips WHERE trips.adminID = (SELECT members.id from members WHERE members.auth = 'gary@gmail.com')));


INSERT INTO consumed_items (itemID, payorID, payeeID, receiptID, tripID) VALUES ((SELECT items.id FROM items WHERE items.name = ? AND items.receiptID = (SELECT receipts.id FROM receipts WHERE receipts.url = ?)), (SELECT members.id FROM members WHERE members.auth = ?), (SELECT members.id FROM members WHERE members.auth = ?), (SELECT receipts.id FROM receipts WHERE receipts.url = ?), (SELECT trips.id FROM trips WHERE trips.adminID = (SELECT members.id from members WHERE members.auth = ?)));


  const assignItemsToMembers = (req, res) => {
  // After gVision data is returned, data will be funneled and immediately be stored in 2 different tables: receipts and items table. Consumed_Items only references items table and info passed down from request headers.
  // There are 2 fields from items table: itemID, receiptID,
  // There are 3 fields from req.headers: payeeID(s), payorID (from members.auth), tripID (from trips.name);
  const items = ['Burger', 'Beef']; // get the exact item by URL
  const dummyPayorAuth = ['gary@gmail.com']; // always only 1 person
  const dummyPayeeAuth = ['jon@gmail.com', 'may@gmail.com'];
  const dummyReceiptURL = 'google.com';

  db.query(queryString.assignItemsToMembers, args, (err, result) => {
    if (err) {
      console.log('ERROR: assignItems in SQL', err);
    } else {
      res.send(result);
    }
  })
}