(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('signUpPageCtrl', signUpPageCtrl);

    signUpPageCtrl.$inject = [];

    function signUpPageCtrl() {
        var vm = this;

        vm.overlay = angular.element(document.querySelector('#overlay'));

        init();

        function init(){
        }

    }
    
})();