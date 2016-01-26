(function() {
  'use strict';

  angular
    .module('afterHeap')
    .config(config);

  /** @ngInject */
  function config($logProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

  }

})();
