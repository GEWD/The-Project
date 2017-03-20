const gcloud = require('gcloud')({
  keyFilename: './goog.json',
  projectId: 'gewd-161701'
});

var vision = gcloud.vision();

var image = 'image.jpg';

vision.detectText('image.jpg', function(err, text, apiResponse) {
  // text = ['This was text found in the image']
});