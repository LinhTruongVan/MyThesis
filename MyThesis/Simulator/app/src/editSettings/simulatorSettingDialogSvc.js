(function () {
    angular.module('app').factory('simulatorSettingDialogSvc', simulatorSettingDialogSvc);

    simulatorSettingDialogSvc.$inject = [];

    function simulatorSettingDialogSvc() {
        var settingTimeout = {
            updateLocation: 900000,
            sendLocation: 900000
        };

        var service = {
            getSettingTimeout: getSettingTimeout,
            setTimeoutForUpdateLocation: setTimeoutForUpdateLocation,
            setTimeoutForSendLocation: setTimeoutForSendLocation

        };
        return service;

        function getSettingTimeout() {
            return settingTimeout;
        }

        function setTimeoutForUpdateLocation(seconds) {
            settingTimeout.updateLocation = seconds;
        }

        function setTimeoutForSendLocation(seconds) {
            settingTimeout.sendLocation = seconds;
        }



        
    }
})();