(function() {
  'use strict';

  angular
    .module('afterHeap')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('runBlock end');
  }

})();
