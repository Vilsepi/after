var https = require('https');
var qs = require('querystring');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var config = {
  untappdClientId: '',
  untappdClientSecret: '',
  bucketName: ''
};

exports.handler = function(event, context) {

  var httpQueryParams = {
    client_id: config.untappdClientId,
    client_secret: config.untappdClientSecret,
    lat: 61.498098,
    lng: 23.760781,
    dist_pref: 'km',
    radius: 1.5
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
      'Key': 'data/thepub.json',
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
