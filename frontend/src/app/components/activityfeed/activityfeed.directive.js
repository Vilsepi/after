(function() {
  'use strict';

  angular
    .module('afterHeap')
    .directive('afterActivityFeed', afterActivityFeed);

  /** @ngInject */
  function afterActivityFeed() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/activityfeed/activityfeed.html',
      controller: ActivityFeedController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ActivityFeedController() {
      //var vm = this;
    }
  }

})();
