module.exports = {
  connectionLimit: 1000,
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'bc13f161df8ceb',
  password: process.env.CLEARDB_PASS,
  database: 'heroku_a258462d4ded143'
};

// SWITCH TO LOCALHOST FOR DB TESTING IF CONNETION MAX EXCEEDED
// module.exports = {
//   // connectionLimit: 10000,
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'gewd'
// };
