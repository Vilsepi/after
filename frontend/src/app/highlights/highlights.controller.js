(function() {
  'use strict';

  angular
    .module('afterHeap')
    .controller('HighlightsController', HighlightsController);

/** @ngInject */
    function HighlightsController(highlights, distances, _) {
      var vm = this;
      vm.data = _.zip(highlights, distances);

    }

})();
