(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('indexCtrl', indexCtrl);

    indexCtrl.$inject = ['indexSvc'];

    function indexCtrl(indexSvc) {
        var vm = this;

        init();

        function init() {
            indexSvc.validateCurrentUser();
        }

    }
    
})();