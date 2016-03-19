"use strict";

var https = require('https');
var _ = require('lodash');
var Q = require('q');
var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();
var config = require('./config');

exports.handler = function(event, context) {

function getVenues(area) {
  var deferred = Q.defer();
  deferred.resolve();
  return deferred.promise;
}

Q.allSettled([
  getVenues(config.areas[0])
])
.then(context.succeed);

};
