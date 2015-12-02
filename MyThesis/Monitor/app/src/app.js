(function () {
    'use strict';

    angular
    .module('app', [
            'ngRoute',
            'ui.bootstrap',
            'angularModalService',
            'angularSpinner'])
        .config(['$routeProvider', 'usSpinnerConfigProvider', function ($routeProvider, usSpinnerConfigProvider) {
            $routeProvider
                 .when('/home', { templateUrl: 'src/home/home.html', controller: 'homeCtrl', controllerAs: 'vm' })
                 .when('/simulate', { templateUrl: 'src/simulate/simulate.html', controller: 'simulateCtrl', controllerAs: 'vm' })
                 .when('/edit', { templateUrl: 'src/edit/edit.html', controller: 'editCtrl', controllerAs: 'vm' })
                 .when('/login', { templateUrl: 'src/loginPage/loginPage.html', controller: 'loginPageCtrl', controllerAs: 'vm' })
                 .when('/signup', { templateUrl: 'src/signUpPage/signUpPage.html', controller: 'signUpPageCtrl', controllerAs: 'vm' })
                 .otherwise({ redirectTo: '/home' });
            usSpinnerConfigProvider.setDefaults({ color: '#337ab7' });
        }]);
})();
