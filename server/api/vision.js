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
  var totalSearch = /(\btotal)/i;
  var startSplice;
  var endSplice;
  for (var i = 0; i < receiptArray.length; i++) {
    if (receiptArray[i].search(firstPriceSearch) !== -1) {
      startSplice = i;
      break;
    }
  }
  for (var j = startSplice; j < receiptArray.length; j++) {
    if (receiptArray[j].search(totalSearch) !== -1) {
      endSplice = j;
      break;
    }
  }
  for (var k = startSplice; k < endSplice; k += 2) {
    itemToPriceObj[receiptArray[k + 1]] = receiptArray[k];
  }
  return itemToPriceObj;
};
