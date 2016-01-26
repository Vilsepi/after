(function() {
  'use strict';

  angular
    .module('afterHeap')
    .directive('afterFooter', afterFooter);

  /** @ngInject */
  function afterFooter() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/footer/footer.html',
      controller: FooterController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterController() {
      //var vm = this;
    }
  }

})();
