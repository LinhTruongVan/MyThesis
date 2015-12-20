(function () {
    angular
        .module('app')
        .directive('editSettings', editSettings);

    function editSettings() {
        var directive = {
            restrict: 'E',
            scope: {
                overlay: '='
            },
            templateUrl: 'src/editSettings/edit-settings.html',
            controller: 'editSettingsCtrl',
            controllerAs: 'vm'
        };

        return directive;
    }
})();