angular
  .module('afterHeap')
  .service('api', function ($http, $log, processResponse) {
    return $http.get('/data/thepub-tampere.json').then(processResponse);
  });
