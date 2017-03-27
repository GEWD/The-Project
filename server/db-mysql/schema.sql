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
/*   created_at    DATETIME DEFAULT CURRENT_TIMESTAMP, */
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
  url           varchar(100),
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
/*   created_at    DATETIME DEFAULT CURRENT_TIMESTAMP, */
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
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/


