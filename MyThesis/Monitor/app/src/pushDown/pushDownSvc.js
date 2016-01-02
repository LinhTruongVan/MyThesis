(function () {
    'use strict';

    angular
        .module('app')
        .factory('pushDownSvc', pushDownSvc);

    pushDownSvc.$inject = [];

    function pushDownSvc() {

        var pushDownSettings = {
            isActive: false,
            mode: {}
        };

        var services = {
            close: closeMe,
            showAddShip: showAddShip,
            showEditShip: showEditShip,
            showAddStorm: showAddStorm,
            showEditStorm: showEditStorm,
            showAddWarning: showAddWarning,
            showEditWarning: showEditWarning,
            getPushDownSettings: getPushDownSettings
        };

        return services;

        function closeMe() {
            pushDownSettings.isActive = false;
            pushDownSettings.mode = {};
        }

        function showAddShip() {
            closeMe();
            pushDownSettings.isActive = true;
            pushDownSettings.mode.addShip = true;
        }

        function showEditShip() {
            closeMe();
            pushDownSettings.isActive = true;
            pushDownSettings.mode.editShip = true;
        }

        function showAddStorm() {
            closeMe();
            pushDownSettings.isActive = true;
            pushDownSettings.mode.addStorm = true;
        }

        function showEditStorm() {
            closeMe();
            pushDownSettings.isActive = true;
            pushDownSettings.mode.editStorm = true;
        }

        function showAddWarning() {
            closeMe();
            pushDownSettings.isActive = true;
            pushDownSettings.mode.addWarning = true;
        }

        function showEditWarning() {
            closeMe();
            pushDownSettings.isActive = true;
            pushDownSettings.mode.editWarning = true;
        }

        function getPushDownSettings() {
            return pushDownSettings;
        }

    }
})();