var https = require('https');
var qs = require('querystring');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var config = {
  untappdClientId: '',
  untappdClientSecret: '',
  bucketName: ''
};

var areas = {
  'tampere':  {name: 'tampere',  lat: 61.4985, lng: 23.7717, radius: 1.06},
  'helsinki': {name: 'helsinki', lat: 60.1671, lng: 24.9409, radius: 1.49},
};
var area = areas['tampere'];

// Get latest beer checkins in a geographical area and store them to S3 as json.
exports.handler = function(event, context) {

  var httpQueryParams = {
    client_id: config.untappdClientId,
    client_secret: config.untappdClientSecret,
    lat: area.lat,
    lng: area.lng,
    radius: area.radius
  };

  var httpOptions = {
    host: 'api.untappd.com',
    path: '/v4/thepub/local' + '?' + qs.stringify(httpQueryParams)
  };

  https.get(httpOptions, function(res) {
    console.log('Remote server rate limit remaining: ', res.headers['x-ratelimit-remaining']);
    if (res.statusCode != 200) {
      console.log('Received non-ok status code from remote: ', res.statusCode);
      context.fail('Request to remote failed');
    }

    var s3params = {
      'Bucket': config.bucketName,
      'Key': 'data/thepub-' + area.name + '.json',
      'ContentLength': res.headers['content-length'],
      'ContentType': 'application/json',
      'Body': res
    };

    s3.upload(s3params, function(err, data) {
      if (err) {
        console.log('Error while uploading to S3: ', err, err.stack);
        context.fail('Failed to upload data to S3');
      }
      else {
        context.succeed('Successfully updated data for area ' + area.name);
      }
    });

  }).on('error', function(e) {
    console.log(e.message);
    context.fail('Failed to get response from remote');
  });

};
