"use strict";

var https = require('https');
var qs = require('querystring');
var _ = require('lodash');
var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();
var config = require('./config');

exports.handler = function(event, context) {

  // Helper that removes keys which have empty string as value (DynamoDB does not allow them)
  function deleteEmptyStrings(obj) {
    for (var k in obj) {
      if (obj[k] === '') {
        delete obj[k];
      } else if (typeof obj[k] === 'object') {
        deleteEmptyStrings(obj[k]);
      }
    }
  }

  // Tries to batch write items until succeeds or lambda timeouts
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

  // Split checkins into beers and venues and write them to dynamo
  function processCheckins(checkins) {
    console.log("Processing items: " + checkins.length);
    deleteEmptyStrings(checkins);

    var beers = {};
    var venues = {};
    
    checkins.forEach(function(checkin) {
      beers[checkin.beer.bid] = checkin.beer;
      venues[checkin.venue.venue_id] = checkin.venue;
    });

    // Helper that prepares hash items by wrapping them into dynamo requests
    function itemsToParams(items, targetTable) {
      var params = { RequestItems: {} };
      params.RequestItems[targetTable] = _.map(_.values(items), function(item){
        return { PutRequest: { Item: item } };
      });
      return params;
    }

    var beerParams = itemsToParams(beers, config.tableBeer);
    var venueParams = itemsToParams(venues, config.tableVenue);

    determinedBatchWrite(beerParams, determinedBatchWrite(venueParams, context.succeed()));
  }

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

  console.log('Calling remote');
  https.get(httpOptions, function(res) {
    console.log('Receiving response');
    console.log('Remote server rate limit remaining: ', res.headers['x-ratelimit-remaining']);

    if (res.statusCode != 200) {
      console.log('Received non-ok status code from remote: ', res.statusCode);
      context.fail('Request to remote failed');
    }

    var responseBody = '';
    res.on('data', function(chunk) { responseBody += chunk; });
    res.on('end', function() {
      console.log('Received response, remaining millis ' + context.getRemainingTimeInMillis());

      var checkins = JSON.parse(responseBody).response.checkins.items;
      processCheckins(checkins);
    });

  }).on('error', function(e) {
    console.log(e.message);
    context.fail('Failed to get response from remote');
  });

};
