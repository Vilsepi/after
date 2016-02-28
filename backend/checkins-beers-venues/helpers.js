var qs = require('querystring');
var exports = module.exports = {};

exports.constructRequestOptions = function(remote_config, area) {

  var httpQueryParams = {
    client_id: remote_config.remoteClientId,
    client_secret: remote_config.remoteClientSecret,
    lat: area.lat,
    lng: area.lng,
    radius: area.radius
  };

  var httpOptions = {
    host: remote_config.remoteHost,
    path: remote_config.remotePath + '?' + qs.stringify(httpQueryParams)
  };

  return httpOptions;

}
