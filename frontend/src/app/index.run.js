(function() {
  'use strict';

  angular
    .module('afterHeap')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {

    /*eslint-disable angular/on-watch, no-unused-vars */
    var handler = { active: true };
    if (handler.active) {
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        $log.debug("$stateChangeStart --- event, toState, toParams, fromState, fromParams", arguments);
      });
      $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
        $log.debug("$stateChangeError --- event, toState, toParams, fromState, fromParams, error", arguments);
      });
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $log.debug("$stateChangeSuccess --- event, toState, toParams, fromState, fromParams", arguments);
      });
      $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
        $log.debug("$viewContentLoading --- event, viewConfig", arguments);
      });
      $rootScope.$on('$viewContentLoaded', function (event) {
        $log.debug("$viewContentLoaded --- event", arguments);
      });
      $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        $log.debug("$stateNotFound --- event, unfoundState, fromState, fromParams", arguments);
      });
    }
    /*eslint-enable */

  }

})();
