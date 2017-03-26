const mysql = require('mysql');
// const createTables = require('./schema.sql');
const mysqlConfig = require('./config.js');
// const Promise = require('bluebird');
const database = 'gewd';

const connection = mysql.createConnection(mysqlConfig);
