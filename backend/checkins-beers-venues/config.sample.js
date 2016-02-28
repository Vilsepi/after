var exports = module.exports = {};

exports.remote = {
  remoteClientId: '',
  remoteClientSecret: '',
  remoteHost: '',
  remotePath: ''
};

exports.dynamo = {
  tableCheckins: '',
  tableBeer: '',
  tableVenue: ''
};

exports.areas = {
  tampere:  {name: 'tampere',  lat: 61.4985, lng: 23.7717, radius: 1.06},
  helsinki: {name: 'helsinki', lat: 60.1671, lng: 24.9409, radius: 1.49}
};
