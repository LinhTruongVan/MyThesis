(function () {
    'use strict';

    angular
    .module('app', [
            'ngRoute',
            'ui.bootstrap',
            'angularModalService',
            'angularSpinner',
            'ngSanitize',
            'ui.date',
            'timer',
            'progress.bar'])
        .config(['$routeProvider', 'usSpinnerConfigProvider', function ($routeProvider, usSpinnerConfigProvider) {
            $routeProvider
                 .when('/home', { templateUrl: 'src/home/home.html', controller: 'homeCtrl', controllerAs: 'vm' })
                 .when('/simulate', { templateUrl: 'src/simulate/simulate.html', controller: 'simulateCtrl', controllerAs: 'vm' })
                 .when('/edit', { templateUrl: 'src/edit/edit.html', controller: 'editCtrl', controllerAs: 'vm' })
                .when('/storm', { templateUrl: 'src/editStorm/storm.html', controller: 'stormCtrl', controllerAs: 'vm' })
                 .when('/weather', { templateUrl: 'src/weather/weather.html', controller: 'weatherCtrl', controllerAs: 'vm' })
                .when('/law', { templateUrl: 'src/law/law.html', controller: 'lawCtrl', controllerAs: 'vm' })
                 .when('/login', { templateUrl: 'src/loginPage/loginPage.html', controller: 'loginPageCtrl', controllerAs: 'vm' })
                 .when('/signup', { templateUrl: 'src/signUpPage/signUpPage.html', controller: 'signUpPageCtrl', controllerAs: 'vm' })
                 .otherwise({ redirectTo: '/home' });
            usSpinnerConfigProvider.setDefaults({ color: '#337ab7' });
        }]);
})();
