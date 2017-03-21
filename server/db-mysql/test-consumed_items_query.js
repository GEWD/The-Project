  // After gVision data is returned, data will be funneled and immediately be stored in 3 different tables: 1) receipts, 2) items and 3) consumed_items.
  // There are 1 fields from items table: itemID (i.e. LAST_INSERT_ID())
  // There are 4 fields from req.headers: payeeID(s), payorID (from members.auth), receiptID, tripID (from trips.name)

  INSERT INTO consumed_items (itemID, payorID, payeeID, receiptID, tripID) \VALUES (LAST_INSERT_ID(), \
           (SELECT members.id FROM members \
              WHERE members.auth = ?), \
           (SELECT members.id FROM members \
              WHERE members.auth = ?), \
           (SELECT items.receiptID \
              WHERE items.id = LAST_INSERT_ID()), \
           (SELECT trips.id from trips ));