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
            'progress.bar',
            'ui.bootstrap.datetimepicker'])
        .config(['$routeProvider', 'usSpinnerConfigProvider', function ($routeProvider, usSpinnerConfigProvider) {
            $routeProvider
                 .when('/trang-chu', { templateUrl: 'src/home/home.html', controller: 'homeCtrl', controllerAs: 'vm' })
                 .when('/mo-phong', { templateUrl: 'src/simulate/simulate.html', controller: 'simulateCtrl', controllerAs: 'vm' })
                 .when('/tau', { templateUrl: 'src/edit/edit.html', controller: 'editCtrl', controllerAs: 'vm' })
                .when('/bao', { templateUrl: 'src/editStorm/storm.html', controller: 'stormCtrl', controllerAs: 'vm' })
                 .when('/thoi-tiet', { templateUrl: 'src/weather/weather.html', controller: 'weatherCtrl', controllerAs: 'vm' })
                .when('/phap-luat', { templateUrl: 'src/law/law.html', controller: 'lawCtrl', controllerAs: 'vm' })
                .when('/canh-bao', { templateUrl: 'src/editWarningLocation/warning-location.html', controller: 'warningLocationCtrl', controllerAs: 'vm' })
                 .when('/dang-nhap', { templateUrl: 'src/loginPage/loginPage.html', controller: 'loginPageCtrl', controllerAs: 'vm' })
                 .when('/dang-ky', { templateUrl: 'src/signUpPage/signUpPage.html', controller: 'signUpPageCtrl', controllerAs: 'vm' })
                 .otherwise({ redirectTo: '/trang-chu' });
            usSpinnerConfigProvider.setDefaults({ color: '#337ab7' });
        }]);
})();
