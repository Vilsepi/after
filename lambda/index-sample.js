var https = require('https');
var qs = require('querystring');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var config = {
  untappdUrl: 'https://api.untappd.com/v4/thepub/local',
  untappdClientId: '',
  untappdClientSecret: '',
  bucketName: ''
};

exports.handler = function(event, context) {
  /*console.log('Received request:', JSON.stringify(event, null, 2));*/

  var httpQueryParams = {
    client_id: config.untappdClientId,
    client_secret: config.untappdClientSecret,
    lat: 61.498171,
    lng: 23.762101,
    dist_pref: 'km',
    radius: 2
  };
  var httpOptions = {
    host: 'api.untappd.com',
    path: '/v4/thepub/local'+'?'+qs.stringify(httpQueryParams)
  };

  https.get(httpOptions, function(res) {
    if (res.statusCode != 200) {
      context.fail('Received non-ok status code from Untappd: ', res.statusCode);
    }

    var body = '';
    res.on('data', function(chunk) { body += chunk; });
    res.on('end', function() {

      var s3params = {
        'Bucket': config.bucketName,
        'Key': 'data/thepub.json',
        'ContentType': 'application/json',
        'Body': body
      };

      s3.putObject(s3params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          context.fail('Error while uploading to S3');
        }
        else {
          context.succeed('Successfully updated data');
        }
      });
    });

  }).on('error', function(e) {
    console.log(e.message);
    context.fail('Failed to get data from Untappd');
  });

};
