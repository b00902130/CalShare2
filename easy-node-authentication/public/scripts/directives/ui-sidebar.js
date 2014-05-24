'use strict';

angular.module('calenshareApp')
.directive('uiSidebar', function () {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.sidebar({overlay: true});
      scope.$on('toggle-sidebar', function(){
        element.sidebar('toggle');
      });
    }
  };
});
