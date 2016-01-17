var https = require('https');
var qs = require('querystring');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

/*
Calls Untappd API to get latest beer checkins in a specific geographical area
and stores the response json to S3. Untappd API credentials are required for
all requests.
*/

var config = {
  untappdClientId: '',
  untappdClientSecret: '',
  bucketName: ''
};

exports.handler = function(event, context) {

  var area = 'tampere';
  var areas = {
    'tampere':  {lat: 61.4985, lng: 23.7717, radius: 1.06},
    'helsinki': {lat: 60.1671, lng: 24.9409, radius: 1.49},
  };

  var httpQueryParams = {
    client_id: config.untappdClientId,
    client_secret: config.untappdClientSecret
  };

  /* Add geofencing parameters to query */
  for (var attr in areas[area]) { httpQueryParams[attr] = areas[area][attr]; }

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
      'Key': 'data/thepub-' + area + '.json',
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
        context.succeed('Successfully updated data');
      }
    });

  }).on('error', function(e) {
    console.log(e.message);
    context.fail('Failed to get response from remote');
  });

};
