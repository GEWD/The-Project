const $ = require('jquery');

module.exports = {
  verify: (cb) => {
    $.get('/verify', function(res) {
      console.log('client /verify get request success', res);
      cb(res);
    });
  },

  logout: (cb) => {
    $.get('/logout', function(res) {
      console.log('successful logout');
      cb(false);
    })
  },

  sendServerTripName: (tripName) => {
    $.post('/createTripName',
    {
      submittedTripName: tripName
    },
    function(res) {
      console.log('successful tripName submitted');
    })
  }

}
