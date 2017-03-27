DROP DATABASE IF EXISTS gewd;

CREATE DATABASE gewd;

USE gewd;

CREATE TABLE IF NOT EXISTS members (
  id            int NOT NULL AUTO_INCREMENT,
  fb_id          varchar(100) NOT NULL DEFAULT 'Payee',
  name          varchar(50) NOT NULL,
  email          varchar(50) NOT NULL DEFAULT 'Payee',
  token          varchar(360) NOT NULL DEFAULT 'Payee',
  PRIMARY KEY   (ID)
);

CREATE TABLE IF NOT EXISTS trips (
  id            int NOT NULL AUTO_INCREMENT,
  name          varchar(50) NOT NULL,
  adminID       int NOT NULL,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY   (ID)
);

CREATE TABLE IF NOT EXISTS trips_members (
  tripID      int NOT NULL,
  memberID    int NOT NULL
);
ALTER TABLE trips ADD FOREIGN KEY (adminID)
REFERENCES members(id);
ALTER TABLE trips_members ADD FOREIGN KEY (tripID)
REFERENCES trips(id);
ALTER TABLE trips_members ADD FOREIGN KEY (memberID)
REFERENCES members(id);

CREATE TABLE IF NOT EXISTS receipts (
  id            int NOT NULL AUTO_INCREMENT,
  payorID      int NOT NULL,
  tripID       int NOT NULL,
  -- poolID       int NOT NULL,
  name          varchar(50) NOT NULL,
  url           varchar(100) NOT NULL UNIQUE,
  sum_bill    int NOT NULL DEFAULT 0,
  sum_tax     int NOT NULL DEFAULT 0,
  sum_tip     int NOT NULL DEFAULT 0,
  PRIMARY KEY   (ID)
);
ALTER TABLE receipts ADD FOREIGN KEY (payorID)
REFERENCES members(id);
ALTER TABLE receipts ADD FOREIGN KEY (tripID)
REFERENCES trips(id);

CREATE TABLE IF NOT EXISTS items (
  id            int NOT NULL AUTO_INCREMENT,
  receiptID     int NOT NULL,
  tripID        int NOT NULL,
  name          varchar(50) NOT NULL,
  raw_price     int NOT NULL DEFAULT 0,
  comment      varchar(50),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY   (ID)
);
ALTER TABLE items ADD FOREIGN KEY (receiptID)
REFERENCES receipts(id);

-- CREATE TABLE pool (
--   id            int NOT NULL AUTO_INCREMENT,
--   tripID       int NOT NULL,
--   PRIMARY KEY   (ID)
-- );
-- ALTER TABLE pool ADD FOREIGN KEY (tripID)
-- REFERENCES trips(id);
-- ALTER TABLE receipts ADD FOREIGN KEY (poolID)
-- REFERENCES pool(id);

CREATE TABLE IF NOT EXISTS consumed_items (
  itemID       int NOT NULL,
  payorID      int NOT NULL,
  payeeID      int NOT NULL,
  receiptID    int NOT NULL,
  tripID       int NOT NULL,
  payment       varchar(10) NOT NULL DEFAULT 'unpaid'
);
ALTER TABLE consumed_items ADD FOREIGN KEY (itemID)
REFERENCES items(id);
ALTER TABLE consumed_items ADD FOREIGN KEY (payorID)
REFERENCES members(id);
ALTER TABLE consumed_items ADD FOREIGN KEY (payeeID)
REFERENCES members(id);
ALTER TABLE consumed_items ADD FOREIGN KEY (receiptID)
REFERENCES receipts(id);
ALTER TABLE consumed_items ADD FOREIGN KEY (tripID)
REFERENCES trips(id);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db-mysql/schema.sql
 *  to create the database and the tables.*/


/*  PLEASE IGNORE BELOW. FOR DB TESTING PURPOSE ONLY */


/* ----------------------------------------- */

/*  TESTING TO CREATE MEMBER AND CREATE TRIP */

-- INSERT INTO members (name, fb_id, email, token) VALUES ('Duy Nguyen', '1230981923','jon@gmail.com','1319089089028394');
-- INSERT INTO trips (name, adminID) VALUES ('Japan2016', (SELECT members.id FROM members WHERE members.name='Duy Nguyen'));
-- INSERT INTO trips_members (tripID, memberID) VALUES (LAST_INSERT_ID(), (SELECT trips.adminID FROM trips WHERE trips.id=LAST_INSERT_ID()));



-- INSERT INTO members (name, fb_id, email, token) VALUES ('Jon', '9999123981923','jon@gmail.com', '30948jaslkdjf233');
-- INSERT INTO trips (name, adminID) VALUES ('Japan2016', (SELECT members.id FROM members WHERE members.name='Jon'));
-- INSERT INTO trips_members (tripID, memberID) VALUES (LAST_INSERT_ID(), (SELECT trips.adminID FROM trips WHERE trips.id=LAST_INSERT_ID()));

-- INSERT INTO members (name, fb_id, email, token) VALUES ('May', '2342300923','may@gmail.com', '3120948jaslkdjf231');
-- INSERT INTO trips (name, adminID) VALUES ('Mexico2016', (SELECT members.id FROM members WHERE members.name='May'));
-- INSERT INTO trips_members (tripID, memberID) VALUES (LAST_INSERT_ID(), (SELECT trips.adminID FROM trips WHERE trips.id=LAST_INSERT_ID()));

-- INSERT INTO members (name, fb_id, email, token) VALUES ('June', '290290342300923','jun@gmail.com', '305634948jaslkdjf236');
-- INSERT INTO trips (name, adminID) VALUES ('Canada2016', (SELECT members.id FROM members WHERE members.name='June'));

-- INSERT INTO trips_members (tripID, memberID) VALUES (LAST_INSERT_ID(), (SELECT trips.adminID FROM trips WHERE trips.id=LAST_INSERT_ID()));

-- /*  TESTING TO ADD NEW MEMBER TO EXISTING TRIP */
-- INSERT INTO trips_members (tripID, memberID) VALUES((SELECT trips.id FROM trips WHERE trips.name = 'Canada2016' AND trips.adminID = (SELECT members.id FROM members WHERE fb_id = '290290342300923')), (SELECT members.id FROM members WHERE fb_id = '9999123981923'));

-- /*  TESTING TO ADD TWO NEW RECEIPT */
-- INSERT INTO receipts (payorID, tripID, name, url, sum_bill, sum_tax, sum_tax_tip) VALUES ((SELECT members.id FROM members WHERE fb_id = '9999123981923'), (SELECT trips.id FROM trips WHERE trips.name = 'Japan2016' AND trips.adminID = (SELECT members.id FROM members WHERE fb_id = '9999123981923')), 'Receipt01', 'google.com', '100', '10', '18');

-- INSERT INTO receipts (payorID, tripID, name, url, sum_bill, sum_tax, sum_tax_tip) VALUES ((SELECT members.id FROM members WHERE members.name = 'Jon'), (SELECT trips.id FROM trips WHERE trips.name = 'Japan2016' AND trips.adminID = (SELECT members.id FROM members WHERE members.name = 'Jon')), 'Receipt02', 'amazon.com', '100', '10', '18');

-- /* TESTING TO ADD NEW ITEM */
-- INSERT INTO items (receiptID, tripID, name, raw_price) VALUES ((SELECT receipts.id from receipts WHERE receipts.url = 'google.com'), (SELECT receipts.tripID from receipts WHERE receipts.url = 'google.com'), 'Burger', 10);

-- /* TESTING TO ADD INTO CONSUMED_ITEMS */
-- INSERT INTO consumed_items (itemID, payorID, payeeID, receiptID, tripID) VALUES ((SELECT items.id FROM items WHERE items.name = 'Burger' AND items.receiptID = (SELECT receipts.id FROM receipts WHERE receipts.url = 'google.com')), (SELECT members.id FROM members WHERE fb_id = '1230981923'), (SELECT members.id FROM members WHERE fb_id = '9999123981923'), (SELECT receipts.id FROM receipts WHERE receipts.url = 'google.com'), (SELECT trips.id FROM trips WHERE trips.adminID = (SELECT members.id from members WHERE fb_id = '1230981923')));
