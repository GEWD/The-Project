
module.exports = {
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: process.env.CLEARDB_USER,
  password: process.env.CLEARDB_PASS,
  database: process.env.CLEARDB_DATABASE
};

// module.exports = {
//  host: 'localhost',
//  user: 'root',
//  password: '',
//  database: 'gewd'
// };

