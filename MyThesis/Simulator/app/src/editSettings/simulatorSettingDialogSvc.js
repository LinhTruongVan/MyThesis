(function () {
    angular.module('app').factory('simulatorSettingDialogSvc', simulatorSettingDialogSvc);

    simulatorSettingDialogSvc.$inject = [];

    function simulatorSettingDialogSvc() {
        var settingTimeout = {
            updateLocation: 10,
            sendLocation: 10
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