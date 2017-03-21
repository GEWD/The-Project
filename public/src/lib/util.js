const $ = require('jquery');

module.exports = {
  verify: (cb) => {
    $.get('/verify', function(res) {
      console.log('client /verify get request success', res);
      cb(res);
    });
  },

  logout: () => {
    $.get('/logout', function(res) {
      console.log('successful logout', res);
    })
  }
  // verify: () => {
  //   fetch('/verify')
  //   .then(function(response) {
  //     if(response.ok) {
  //       console.log('response okay', response.blob);
  //     }
  //     throw new Error('Network response was not okay.');
  //   })
  //   .catch(function(error) {
  //     console.log('There has been a problem with your fetch operation', error.message);
  //   })
  // }
}
