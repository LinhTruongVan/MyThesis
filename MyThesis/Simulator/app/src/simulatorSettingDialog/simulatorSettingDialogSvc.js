(function () {
    angular.module('app').factory('simulatorSettingDialogSvc', simulatorSettingDialogSvc);

    simulatorSettingDialogSvc.$inject = ['settingConst'];

    function simulatorSettingDialogSvc(settingConst) {
        var service = {
            getShipTypes: getShipTypes,
            validateShip: validateShip
        };
        return service;

        function getShipTypes() {
            return [
                settingConst.shipType.fishingShip
            ];
        }

        function validateShip(ship) {
            if (!ship.ShipType) {
                toastr.error('Chưa nhập loại tàu!');
                return false;
            }

            if (!ship.Speed || ship.Speed < 0) {
                toastr.error('Vận tốc tàu không hợp lệ!');
                return false;
            }

            if (!ship.Weight || ship.Weight < 0) {
                toastr.error('Trọng tải tàu không hợp lệ!');
                return false;
            }

            if (!ship.Caption) {
                toastr.error('Tên thuyền trưởng không hợp lệ!');
                return false;
            }

            if (!ship.Sailors) {
                toastr.error('Số lượng thuyền viên không hợp lệ!');
                return false;
            }

            return true;
        }
    }
})();