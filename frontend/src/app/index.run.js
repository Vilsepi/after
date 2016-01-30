(function() {
  'use strict';

  angular
    .module('afterHeap')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {

    $log.debug('runBlock end');
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
    });
  }

})();
