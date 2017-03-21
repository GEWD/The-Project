DROP DATABASE IF EXISTS gewd;

CREATE DATABASE gewd;

USE gewd;

CREATE TABLE members (
  id            int NOT NULL AUTO_INCREMENT,
  name          varchar(50) NOT NULL,
  auth          varchar(50) NOT NULL,
  PRIMARY KEY   (ID)
);

CREATE TABLE trips (
  id            int NOT NULL AUTO_INCREMENT,
  name          varchar(50) NOT NULL,
  adminID       int NOT NULL,
  PRIMARY KEY   (ID)
);

CREATE TABLE trips_members (
  tripID      int NOT NULL,
  memberID    int NOT NULL
);
ALTER TABLE trips ADD FOREIGN KEY (adminID)
REFERENCES members(id);
ALTER TABLE trips_members ADD FOREIGN KEY (tripID)
REFERENCES trips(id);
ALTER TABLE trips_members ADD FOREIGN KEY (memberID)
REFERENCES members(id);

CREATE TABLE receipts (
  id            int NOT NULL AUTO_INCREMENT,
  payorID      int NOT NULL,
  tripID       int NOT NULL,
  -- poolID       int NOT NULL,
  name          varchar(50) NOT NULL,
  url           varchar(100) NOT NULL ,
  sum_bill    int NOT NULL DEFAULT 0,
  sum_tax     int NOT NULL DEFAULT 0,
  sum_tax_tip int NOT NULL DEFAULT 0,
  PRIMARY KEY   (ID)
);
ALTER TABLE receipts ADD FOREIGN KEY (payorID)
REFERENCES members(id);
ALTER TABLE receipts ADD FOREIGN KEY (tripID)
REFERENCES trips(id);

CREATE TABLE items (
  id            int NOT NULL AUTO_INCREMENT,
  receiptID    int NOT NULL,
  tripID        int NOT NULL,
  name          varchar(50) NOT NULL,
  raw_price     int NOT NULL DEFAULT 0,
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

CREATE TABLE consumed_items (
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
INSERT INTO members (name, auth) VALUES ('Gary', 'gary@gmail.com');
INSERT INTO trips (name, adminID) VALUES ('Japan2016', (SELECT members.id FROM members WHERE members.auth='gary@gmail.com'));
INSERT INTO trips_members (tripID, memberID) VALUES (LAST_INSERT_ID(), (SELECT trips.adminID FROM trips WHERE trips.id=LAST_INSERT_ID()));

INSERT INTO members (name, auth) VALUES ('Jon', 'jon@gmail.com');
INSERT INTO trips (name, adminID) VALUES ('Japan2016', (SELECT members.id FROM members WHERE members.auth='jon@gmail.com'));
INSERT INTO trips_members (tripID, memberID) VALUES (LAST_INSERT_ID(), (SELECT trips.adminID FROM trips WHERE trips.id=LAST_INSERT_ID()));

INSERT INTO members (name, auth) VALUES ('May', 'may@gmail.com');
INSERT INTO trips (name, adminID) VALUES ('Japan2016', (SELECT members.id FROM members WHERE members.auth='may@gmail.com'));
INSERT INTO trips_members (tripID, memberID) VALUES (LAST_INSERT_ID(), (SELECT trips.adminID FROM trips WHERE trips.id=LAST_INSERT_ID()));

INSERT INTO members (name, auth) VALUES ('June', 'june@gmail.com');
INSERT INTO trips (name, adminID) VALUES ('Canada2016', (SELECT members.id FROM members WHERE members.auth='june@gmail.com'));
INSERT INTO trips_members (tripID, memberID) VALUES (LAST_INSERT_ID(), (SELECT trips.adminID FROM trips WHERE trips.id=LAST_INSERT_ID()));

/*  TESTING TO ADD NEW MEMBER TO EXISTING TRIP */
INSERT INTO trips_members (tripID, memberID) VALUES((SELECT trips.id FROM trips WHERE trips.name = 'Canada2016' AND trips.adminID = (SELECT members.id FROM members WHERE members.auth = 'june@gmail.com')), (SELECT members.id FROM members WHERE members.auth = 'jon@gmail.com'));

-- /*  TESTING TO ADD NEW RECEIPT */
INSERT INTO receipts (payorID, tripID, name, url, sum_bill, sum_tax, sum_tax_tip) VALUES ((SELECT members.id FROM members WHERE members.auth = 'jon@gmail.com'), (SELECT trips.id FROM trips WHERE trips.name = 'Japan2016' AND trips.adminID = (SELECT members.id FROM members WHERE members.auth = 'jon@gmail.com')), 'Receipt01', 'google.com', '100', '10', '18');

-- /* TESTING TO ADD NEW ITEM */
INSERT INTO items (receiptID, tripID, name, raw_price) VALUES ((SELECT receipts.id from receipts WHERE receipts.url = 'google.com'), (SELECT receipts.tripID from receipts WHERE receipts.url = 'google.com'), 'Burger', 10);
