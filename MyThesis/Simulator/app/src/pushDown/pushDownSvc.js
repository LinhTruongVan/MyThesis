(function () {
    angular
        .module('app')
        .factory('pushDownSvc', pushDownSvc);

    pushDownSvc.$inject = [];

    function pushDownSvc() {
        var settings = {
            isActive: false,
            mode: {}
        };

        var pushDownModes={
            addShip: 'add-ship',
            addStorm: 'add-storm',
            addWarning: 'add-warning',
            editSettings: 'edit-settings'
        };

        var service = {
            getPushDownSettings: getPushDownSettings,
            hidePushDown: hidePushDown,
            showAddShip: showAddShip,
            showAddStorm: showAddStorm,
            showAddWarning: showAddWarning,
            showEditSettings: showEditSettings
        };
        return service;

        function getPushDownSettings() {
            return settings;
        }

        function hidePushDown() {
            settings.isActive = false;
            settings.mode = {};
        }

        function showAddShip() {
            hidePushDown();
            settings.isActive = true;
            settings.mode.addShip = pushDownModes.addShip;
        }

        function showAddStorm() {
            hidePushDown();
            settings.isActive = true;
            settings.mode.addStorm = pushDownModes.addStorm;
        }

        function showAddWarning() {
            hidePushDown();
            settings.isActive = true;
            settings.mode.addWarning = pushDownModes.addWarning;
        }

        function showEditSettings() {
            hidePushDown();
            settings.isActive = true;
            settings.mode.editSettings = pushDownModes.editSettings;
        }

    }
})();