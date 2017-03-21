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
  trip_name     varchar(50) NOT NULL,
  admin_fk      int NOT NULL,
  PRIMARY KEY   (ID)
);

CREATE TABLE trips_members (
  trip_fk      int NOT NULL,
  member_fk    int NOT NULL
);
ALTER TABLE trips ADD FOREIGN KEY (admin_fk)
REFERENCES members(id);
ALTER TABLE trips_members ADD FOREIGN KEY (trip_fk)
REFERENCES trips(id);
ALTER TABLE trips_members ADD FOREIGN KEY (member_fk)
REFERENCES members(id);

CREATE TABLE receipts (
  id            int NOT NULL AUTO_INCREMENT,
  payor_fk      int NOT NULL,
  trip_fk       int NOT NULL,
  -- pool_fk       int NOT NULL,
  name          varchar(50) NOT NULL,
  url           varchar(100) NOT NULL,
  sum_bill    int NOT NULL DEFAULT 0,
  sum_tax     int NOT NULL DEFAULT 0,
  sum_tax_tip int NOT NULL DEFAULT 0,
  PRIMARY KEY   (ID)
);
ALTER TABLE receipts ADD FOREIGN KEY (payor_fk)
REFERENCES members(id);
ALTER TABLE receipts ADD FOREIGN KEY (trip_fk)
REFERENCES trips(id);

CREATE TABLE items (
  id            int NOT NULL AUTO_INCREMENT,
  receipt_fk    int NOT NULL,
  name          varchar(50) NOT NULL,
  raw_price     int NOT NULL DEFAULT 0,
  PRIMARY KEY   (ID)
);
ALTER TABLE items ADD FOREIGN KEY (receipt_fk)
REFERENCES receipts(id);

-- CREATE TABLE pool (
--   id            int NOT NULL AUTO_INCREMENT,
--   trip_fk       int NOT NULL,
--   PRIMARY KEY   (ID)
-- );
-- ALTER TABLE pool ADD FOREIGN KEY (trip_fk)
-- REFERENCES trips(id);
-- ALTER TABLE receipts ADD FOREIGN KEY (pool_fk)
-- REFERENCES pool(id);

CREATE TABLE consumed_items (
  item_fk       int NOT NULL,
  payor_fk      int NOT NULL,
  payee_fk      int NOT NULL,
  receipt_fk    int NOT NULL,
  trip_fk       int NOT NULL,
  payment       varchar(10) NOT NULL DEFAULT 'unpaid'
);
ALTER TABLE consumed_items ADD FOREIGN KEY (item_fk)
REFERENCES items(id);
ALTER TABLE consumed_items ADD FOREIGN KEY (payor_fk)
REFERENCES members(id);
ALTER TABLE consumed_items ADD FOREIGN KEY (payee_fk)
REFERENCES members(id);
ALTER TABLE consumed_items ADD FOREIGN KEY (receipt_fk)
REFERENCES receipts(id);
ALTER TABLE consumed_items ADD FOREIGN KEY (trip_fk)
REFERENCES trips(id);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/db-mysql/schema.sql
 *  to create the database and the tables.*/


/*  PLEASE IGNORE BELOW. FOR DB TESTING PURPOSE ONLY */


/* ----------------------------------------- */

/*  TESTING TO CREATE MEMBER AND CREATE TRIP */
INSERT INTO members (name, auth) VALUES ('Gary', 'gary@gmail.com');
INSERT INTO trips (trip_name, admin_fk) VALUES ('Japan2016', (SELECT members.id FROM members WHERE members.name='Gary'));
INSERT INTO trips_members (trip_fk, member_fk) VALUES (LAST_INSERT_ID(), (SELECT trips.admin_fk FROM trips WHERE trips.id=LAST_INSERT_ID()));

INSERT INTO members (name, auth) VALUES ('Jon', 'jon@gmail.com');
INSERT INTO trips (trip_name, admin_fk) VALUES ('Japan2016', (SELECT members.id FROM members WHERE members.name='Jon'));
INSERT INTO trips_members (trip_fk, member_fk) VALUES (LAST_INSERT_ID(), (SELECT trips.admin_fk FROM trips WHERE trips.id=LAST_INSERT_ID()));

INSERT INTO members (name, auth) VALUES ('May', 'may@gmail.com');
INSERT INTO trips (trip_name, admin_fk) VALUES ('Japan2016', (SELECT members.id FROM members WHERE members.name='May'));
INSERT INTO trips_members (trip_fk, member_fk) VALUES (LAST_INSERT_ID(), (SELECT trips.admin_fk FROM trips WHERE trips.id=LAST_INSERT_ID()));

INSERT INTO members (name, auth) VALUES ('June', 'jun@gmail.com');
INSERT INTO trips (trip_name, admin_fk) VALUES ('Canada2016', (SELECT members.id FROM members WHERE members.name='June'));
INSERT INTO trips_members (trip_fk, member_fk) VALUES (LAST_INSERT_ID(), (SELECT trips.admin_fk FROM trips WHERE trips.id=LAST_INSERT_ID()));

/*  TESTING TO ADD NEW MEMBER TO EXISTING TRIP */
INSERT INTO trips_members (trip_fk, member_fk) VALUES((SELECT trips.id FROM trips WHERE trips.trip_name = 'Japan2016' AND trips.admin_fk = (SELECT members.id FROM members WHERE members.name = 'Jon')), (SELECT members.id FROM members WHERE members.name = 'June'));

INSERT INTO receipts (payor_fk, trip_fk, name, url, sum_bill, sum_tax, sum_tax_tip) VALUES ((SELECT members.id FROM members WHERE members.name = 'Jon'), (SELECT trips.id FROM trips WHERE trips.trip_name = 'Japan2016'), 'Receipt01', 'google.com', '100', '10', '18');
