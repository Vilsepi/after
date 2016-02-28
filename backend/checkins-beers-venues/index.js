"use strict";

var https = require('https');
var _ = require('lodash');
var Q = require('q');
var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var config = require('./config');
var helpers = require('./helpers');

exports.handler = function(event, context) {

// Remove keys which have empty string as value (DynamoDB does not allow them)
function deleteEmptyStrings(obj) {
  for (var k in obj) {
    if (obj[k] === '') {
      delete obj[k];
    } else if (typeof obj[k] === 'object') {
      deleteEmptyStrings(obj[k]);
    }
  }
}

function getCheckins(area) {
  var deferred = Q.defer();

  https.get(helpers.constructRequestOptions(config.remote, area), function(res) {
    console.log('Remote server rate limit remaining: ', res.headers['x-ratelimit-remaining']);

    if (res.statusCode != 200) {
      console.error('Received non-ok status code from remote: ', res.statusCode);
      context.fail('Request to remote failed');
    }

    var responseBody = '';
    res.on('data', function(chunk) { responseBody += chunk; });
    res.on('end', function() {
      console.log('Received response, remaining millis ' + context.getRemainingTimeInMillis());

      var checkins = {
        areaName: area.name,
        items: JSON.parse(responseBody).response.checkins.items
      };
      deferred.resolve(checkins);
    });

  }).on('error', function(e) {
    console.error(e.message);
    context.fail('Failed to get response from remote');
  });
  return deferred.promise;
}

// Batch write items to DynamoDB until success or lambda timeouts
function determinedBatchWrite(dynamoParams, batchDoneCallback) {

  if (dynamoParams.RequestItems) {
    _.forOwn(dynamoParams.RequestItems, function(value, key) {
      console.log("Batch of " + value.length + " items for table " + key);
    });
  }

  dynamo.batchWriteItem(dynamoParams, function(err, data) {
    if (err) {
      console.log(err);
      context.fail(err);
    }
    else {
      if (_.isEmpty(data.UnprocessedItems)) {
        batchDoneCallback();
      }
      else {
        console.log("UnprocessedItems: " + _.find(data.UnprocessedItems).length);
        var params = {};
        params.RequestItems = data.UnprocessedItems;
        determinedBatchWrite(params, batchDoneCallback);
      }
    }
  });
}

function saveToDynamo(items, table) {
  var deferred = Q.defer();

  var params = { RequestItems: {} };
  params.RequestItems[table] = _.map(_.values(items), function(item){
    return { PutRequest: { Item: item } };
  });

  determinedBatchWrite(params, deferred.resolve);
  return deferred.promise;
}

function saveToS3(items, areaName) {
  var deferred = Q.defer();
  var s3params = {
    'Bucket': config.database.bucketName,
    'Key': 'data/activity-' + areaName + '.json',
    'ContentType': 'application/json',
    'Body': JSON.stringify(items)
  };

  s3.putObject(s3params, function(err, data) {
    if (err) {
      context.fail('Failed to upload data to S3');
    } else {
      deferred.resolve("S3 Upload OK");
    }
  });

  return deferred.promise;
}

// Save checkins, beers and venues to dynamo from latest checkins
function saveCheckinsBeersVenues(checkinData) {
  var checkins = checkinData.items;
  var areaName = checkinData.areaName;
  var beers = {};
  var venues = {};

  deleteEmptyStrings(checkins);

  // Filter and customize items before saving
  checkins.forEach(function(checkin) {
    beers[checkin.beer.bid] = _(checkin.beer)
    .omit(['auth_rating', 'beer_description', 'wish_list'])
    .value();

    venues[checkin.venue.venue_id] = _(checkin.venue)
    .omit(['is_verified'])
    .assign({ area: areaName })
    .value();
  });

  return Q.allSettled([
    saveToDynamo(checkins, config.database.tableCheckins),
    saveToDynamo(beers, config.database.tableBeer),
    saveToDynamo(venues, config.database.tableVenue),
    saveToS3(checkins, areaName)
  ]);
}


Q.allSettled([
  getCheckins(config.areas.tampere).then(saveCheckinsBeersVenues),
  getCheckins(config.areas.helsinki).then(saveCheckinsBeersVenues)
])
.then(context.succeed);

};
