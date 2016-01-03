(function () {
    'use strict';

    angular
        .module('app')
        .controller('warningLocationCtrl', warningLocationCtrl);

    warningLocationCtrl.$inject = ['userSvc', '$location', 'spinnerUtilSvc', 'warningLocationDataSvc', 'pushDownSvc', 'warningLocationConst'];

    function warningLocationCtrl(userSvc, $location, spinnerUtilSvc, warningLocationDataSvc, pushDownSvc, warningLocationConst) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.pushDownSettings = pushDownSvc.getPushDownSettings();

        vm.logout = logout;
        vm.showAddWarning = showAddWarning;
        vm.showEditWarning = showEditWarning;
        vm.handleAfterSave = handleAfterSave;
        vm.handleAfterEditWarning = handleAfterEditWarning;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();
            setupWarningLocations();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/dang-nhap');
            sessionStorage.removeItem('user');
        }

        function setupWarningLocations() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            warningLocationDataSvc.getAllWarningLocations().then(function (response) {
                vm.warnings = response.data.filter(function (item) {
                    return item.UserId === vm.currentUser.Id;
                });

                vm.warnings.forEach(function(item) {
                    switch (item.WarningLocationType) {
                        case warningLocationConst.reef.value:
                            item.displayType = warningLocationConst.reef.name;
                            break;
                        case warningLocationConst.pirateShip.value:
                            item.displayType = warningLocationConst.pirateShip.name;
                            break;
                        case warningLocationConst.chinaShip.value:
                            item.displayType = warningLocationConst.chinaShip.name;
                            break;
                    }
                });

                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function () {
                toastr.error('Tải dữ liệu không thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            });
        }

        function showAddWarning() {
            pushDownSvc.showAddWarning();
        }

        function showEditWarning() {
            pushDownSvc.showEditWarning();
        }

        function handleAfterSave(warningFromApi) {
            vm.warnings.push(warningFromApi);
        }

        function handleAfterEditWarning(warningFromApi) {
            if (warningFromApi.isDeleting) {
                vm.warnings.splice(warningFromApi.warningIndex, 1);
            } else {
                switch (warningFromApi.WarningLocationType) {
                    case warningLocationConst.reef.value:
                        warningFromApi.displayType = warningLocationConst.reef.name;
                        break;
                    case warningLocationConst.pirateShip.value:
                        warningFromApi.displayType = warningLocationConst.pirateShip.name;
                        break;
                    case warningLocationConst.chinaShip.value:
                        warningFromApi.displayType = warningLocationConst.chinaShip.name;
                        break;
                }
                vm.warnings[warningFromApi.warningIndex] = warningFromApi;
            }
        }

    }
})();