const mysql = require('mysql');
// const createTables = require('./schema.sql');
const mysqlConfig = require('./config.js');
// const Promise = require('bluebird');
const database = 'gewd';

const connection = mysql.createConnection(mysqlConfig);

// const db = Promise.promisifyAll(connection, { multiArgs: true });

// db.connectAsync().then(function() {
//   console.log('Connected to ' + database + 'database as ID ' + db.threadId);
//   return db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + database);
// }).then(function() {
//   return db.queryAsync('USE ' + database);
// }).then(function() {
//   return createTables(db);
// });

// module.exports = db;