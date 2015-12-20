(function () {
    angular.module('app').factory('createWarningLocationDialogSvc', createWarningLocationDialogSvc);

    createWarningLocationDialogSvc.$inject = ['settingConst'];

    function createWarningLocationDialogSvc(settingConst) {
        var service = {
            getWarningLocationTypes: getWarningLocationTypes,
            validateWarningLocation: validateWarningLocation
        };
        return service;

        function getWarningLocationTypes() {
            return [
                settingConst.warningLocationType.reef,
                settingConst.warningLocationType.pirate,
                settingConst.warningLocationType.chinaShip
            ];
        }

        function validateWarningLocation(warningLocation) {
            if (!warningLocation.WarningLocationType) {
                toastr.error('Chưa nhập loại cảnh báo!');
                return false;
            }

            if (!warningLocation.Latitude) {
                toastr.error('Chưa nhập vĩ độ của cảnh báo!');
                return false;
            }

            if (!warningLocation.Longitude) {
                toastr.error('Chưa nhập kinh độ của cảnh báo!');
                return false;
            }

            return true;
        }
    }
})();