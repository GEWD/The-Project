DROP DATABASE IF EXISTS hackmo;

CREATE DATABASE gewd;

USE gewd;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  balance decimal(10, 2) NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

INSERT INTO users (id, name, balance) VALUES (1, "beth", 1915.96);