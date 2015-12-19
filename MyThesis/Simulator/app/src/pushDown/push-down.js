(function () {
    'use strict';

    angular
        .module('app')
        .directive('pushDown', pushDown);

    function pushDown() {
        var directive = {
            restrict: 'E',
            transclude: true,
            templateUrl: 'src/pushDown/push-down.html',
            controller: 'pushDownCtrl'
        };

        return directive;
    }
})();