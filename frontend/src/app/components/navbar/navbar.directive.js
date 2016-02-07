(function() {
  'use strict';

  angular
    .module('afterHeap')
    .directive('afterNavbar', afterNavbar);

  /** @ngInject */
  function afterNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($stateParams) {
      var vm = this;
      vm.stateParams = $stateParams;
    }
  }

})();
