"use strict";

var https = require('https');
var qs = require('querystring');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var config = require('./config');

// Get latest checkins in a geographical area and store them to S3 as json.
exports.handler = function(event, context) {

  var httpQueryParams = {
    client_id: config.remoteClientId,
    client_secret: config.remoteClientSecret,
    lat: config.area.lat,
    lng: config.area.lng,
    radius: config.area.radius
  };

  var httpOptions = {
    host: config.remoteHost,
    path: config.remotePath + '?' + qs.stringify(httpQueryParams)
  };

  https.get(httpOptions, function(res) {
    console.log('Remote server rate limit remaining: ', res.headers['x-ratelimit-remaining']);
    if (res.statusCode != 200) {
      console.log('Received non-ok status code from remote: ', res.statusCode);
      context.fail('Request to remote failed');
    }

    var s3params = {
      'Bucket': config.bucketName,
      'Key': 'data/thepub-' + config.area.name + '.json',
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
        context.succeed('Successfully updated data for area ' + config.area.name);
      }
    });

  }).on('error', function(e) {
    console.log(e.message);
    context.fail('Failed to get response from remote');
  });

};
