(function () {
    angular
        .module('app')
        .directive('addWarning', addWarning);

    function addWarning() {
        var directive = {
            restrict: 'E',
            scope: {
                overlay: '='
            },
            templateUrl: 'src/addWarning/add-warning.html',
            controller: 'addWarningCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();