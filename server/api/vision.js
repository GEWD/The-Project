const express = require('express');
const gcloud = require('google-cloud');
const app = express();
const Promise = require('bluebird');
const index = require('../index.js');

//Google-cloud mod setup
const vision = gcloud.vision;
const visionClient = vision({
  projectId: 'gewd-161701',
  credentials: {
    client_email: process.env.client_email,
    private_key: process.env.private_key.replace(/\\n/g, '\n')
  }
});

exports.promisifiedDetectText = function(image) {
  return new Promise(function(resolve, reject) {
    visionClient.detectText(image, function(err, text) {
      if (err) {
        reject(err);
      } else {
        resolve(text);
      }
    });
  });
};


exports.spliceReceipt = function(receiptArray) {
  var itemToPriceObj = {};
  var firstPriceSearch = /\.\d\d/;
  var totalSearch = /(\btotal|\btota)/i;
  var startSplice;
  var endSplice;
  for (var i = 0; i < receiptArray.length; i++) {
    if (receiptArray[i].search(firstPriceSearch) !== -1) {
      startSplice = i;
      break;
    }
  }
  for (var j = receiptArray.length - 1; j > 0; j--) {
    if (receiptArray[j].search(totalSearch) !== -1) {
      endSplice = j;
      break;
    }
  }
  for (var k = startSplice; k < endSplice; k += 2) {
    if (receiptArray[k + 1].search(/sub/ig) === -1) {
      itemToPriceObj[receiptArray[k + 1]] = receiptArray[k].replace( /[^.|\d]/g, '');
    }
  }
  var checkPricesAddToTotal = function() {
    var totalPrice = Number(itemToPriceObj[Object.keys(itemToPriceObj)[Object.keys(itemToPriceObj).length - 1]]);
    var accumPrice = 0;
    for (var item in itemToPriceObj) {
      accumPrice += Number(itemToPriceObj[item]);
    }
    //Subtract totalPrice because it will be included within the obj loop
    accumPrice -= totalPrice;
    if (totalPrice !== accumPrice) {
      itemToPriceObj['<NOTE>'] = 'We apologize for the inconvenience, our <strike>sick</strike> algorithm was unable to accurately parse your receipt. Please utilize the delete and add items buttons to adjust the results and to remove this note';
    }
  };
  checkPricesAddToTotal();
  return itemToPriceObj;
};
