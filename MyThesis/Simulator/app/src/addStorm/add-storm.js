(function () {
    angular
        .module('app')
        .directive('addStorm', addStorm);

    function addStorm() {
        var directive = {
            restrict: 'E',
            scope: {
                overlay: '='
            },
            templateUrl: 'src/addStorm/add-storm.html',
            controller: 'addStormCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();