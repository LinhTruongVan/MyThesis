(function () {
    'use strict';

    angular
    .module('app', [
            'ngRoute',
            'ui.bootstrap',
            'angularModalService',
            'angularSpinner',
            'rzModule'])
        .config(['$routeProvider', 'usSpinnerConfigProvider', function ($routeProvider, usSpinnerConfigProvider) {
            // $routeProvider
            //     .when('/', { templateUrl: '../index.html', controller: 'indexCtrl', controllerAs: 'vm' })
            //     .otherwise({ redirectTo: '/' });
            usSpinnerConfigProvider.setDefaults({ color: '#337ab7' });
    }]);
})();
