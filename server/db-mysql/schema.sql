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
  trips_fk      int NOT NULL,
  members_fk    int NOT NULL
);
ALTER TABLE trips ADD FOREIGN KEY (admin_fk)
REFERENCES members(id);
ALTER TABLE trips_members ADD FOREIGN KEY (trips_fk)
REFERENCES trips(id);
ALTER TABLE trips_members ADD FOREIGN KEY (members_fk)
REFERENCES members(id);

CREATE TABLE receipts (
  id            int NOT NULL AUTO_INCREMENT,
  payor_fk      int NOT NULL,
  trip_fk       int NOT NULL,
  pool_fk       int NOT NULL,
  name          varchar(50) NOT NULL,
  url           varchar(50) NOT NULL,
  total_bill    varchar(50) NOT NULL,
  total_tax     varchar(50) NOT NULL,
  total_tax_tip varchar(50) NOT NULL,
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
  raw_price     varchar(50),
  PRIMARY KEY   (ID)
);
ALTER TABLE items ADD FOREIGN KEY (receipt_fk)
REFERENCES receipts(id);

CREATE TABLE pool (
  id            int NOT NULL AUTO_INCREMENT,
  trip_fk       int NOT NULL,
  PRIMARY KEY   (ID)
);
ALTER TABLE pool ADD FOREIGN KEY (trip_fk)
REFERENCES trips(id);
ALTER TABLE receipts ADD FOREIGN KEY (pool_fk)
REFERENCES pool(id);

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
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

INSERT INTO members (id, name, auth) VALUES (1, "Aiden", 1337);
