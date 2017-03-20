const express = require('express');
const gcloud = require('google-cloud');
const app = express();
const Promise = require('bluebird');

//Google-cloud mod setup
const vision = gcloud.vision;
const visionClient = vision({
  projectId: 'gewd-161701',
  keyFilename: __dirname + '/../../env/goog.json'
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
                                                             


