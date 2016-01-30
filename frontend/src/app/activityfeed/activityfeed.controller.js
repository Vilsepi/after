(function() {
  'use strict';

  angular
    .module('afterHeap')
    .controller('ActivityFeedController', ActivityFeedController);

  /** @ngInject */
  function ActivityFeedController(checkins) {
      var vm = this;
      vm.data = checkins;
  }

})();
