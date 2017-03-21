const express = require('express');
const gcloud = require('google-cloud');
const app = express();
const Promise = require('bluebird');

//Google-cloud mod setup
const vision = gcloud.vision;
const visionClient = vision({
  projectId: 'gewd-161701',
  keyFilename: '../env/goog.json'
});

//Google-cloud usage
// let image = './test.jpg';

// visionClient.detectText(image, function(err, text, apiResponse) {
//   if (err) {
//     console.log('Received error within vision:detectText', err);
//   } else {
//     console.log(`Text found in ${image}:`, text);
//     console.log('Response from api:', apiResponse);
//   }
// });

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

// exports.promisifiedDetectText(image)
// .then(function(results) {
//   console.log(results);
// })
// .error(function(e) {
//   console.log('Error received in promisifiedDetectText:', e);
// });

// exports.scanPic = function(image, function(err, results) {
//   if (err) {
//     console.log('Received err in scanPic:', err)
//   } else {
//     visionClient.detectText(image, function(err, text, apiResponse) {
//       if (err) {
//         console.log('Received error within vision:detectText', err);
//       } else {
//         console.log(`Text found in ${image}:`, text);
//         console.log('Response from api:', apiResponse);
//       }
//     });
//   }
// })

// exports.scanPic = function(image) {
//   return new Promise(function(resolve, reject) {

//   })
// }
