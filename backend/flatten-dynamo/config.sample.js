var areas = {
  tampere:     {name: 'tampere',     lat: 61.4985, lng: 23.7717, radius: 1.06},
  hameenlinna: {name: 'hameenlinna', lat: 60.9963, lng: 24.4629, radius: 0.66},
  helsinki:    {name: 'helsinki',    lat: 60.1671, lng: 24.9409, radius: 1.49},
};

var config = {
  remoteClientId: '',
  remoteClientSecret: '',
  remoteHost: '',
  remotePath: '',
  area: areas.tampere,
  tableBeer: '',
  tableVenue: ''
};

module.exports = config;
