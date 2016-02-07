(function() {
  'use strict';

  angular
    .module('afterHeap')
    .controller('HighlightsController', HighlightsController);

  /** @ngInject */
  function HighlightsController(highlights) {
    var vm = this;
    vm.highlights = highlights;
  }

})();
