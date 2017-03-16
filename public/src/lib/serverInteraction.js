//Function to send trip name to server 
exports.sendServerTripName = (tripName) => {
  fetch('http://127.0.0.1:3000/testTripName', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      submittedTripName: tripName
    })
  });
};
