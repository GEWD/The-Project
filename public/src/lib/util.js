const $ = require('jquery');

module.exports = {
  verify: (cb) => {
    $.get('/verify', function(res) {
      console.log('client /verify get request success');
      cb(res);
    });
  },

  logout: (cb) => {
    $.get('/logout', function(res) {
      console.log('successful logout');
      cb(false);
    })
  },

  sendServerTripName: (tripName, tripDesc) => {
    $.post('/createTripName',
    {
      submittedTripName: tripName,
      submittedTripDesc: tripDesc
    },
    function(res) {
      console.log('successful tripName submitted');
    })
  },

  insertIntoDb: (data) => {
    $.post('/summary', data,
    function(res) {
      console.log('success inserting into db', res);
    })
  }

}
