(function () {
    'use strict';

    angular
        .module('app')
        .controller('stormCtrl', stormCtrl);

    stormCtrl.$inject = ['userSvc', '$location', 'spinnerUtilSvc', 'stormDataSvc', 'pushDownSvc'];

    function stormCtrl(userSvc, $location, spinnerUtilSvc, stormDataSvc, pushDownSvc) {
        var vm = this;
        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.pushDownSettings = pushDownSvc.getPushDownSettings();

        vm.logout = logout;
        vm.showAddStorm = showAddStorm;
        vm.showEditStorm = showEditStorm;
        vm.handleAfterSave = handleAfterSave;
        vm.handleAfterEditStorm = handleAfterEditStorm;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();


            if (vm.currentUser.Id !== 1) {
                toastr.error('Chỉ admin mới có quyền truy cập');
                $location.path('/trang-chu');
            }
            setupStorms();
        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/dang-nhap');
            sessionStorage.removeItem('user');
        }

        function setupStorms() {
            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            stormDataSvc.getStorms().then(function (response) {
                vm.storms = response.data;

                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            }, function() {
                toastr.error('Tải dữ liệu không thành công');
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
            });
        }

        function showAddStorm() {
            pushDownSvc.showAddStorm();
        }

        function showEditStorm() {
            pushDownSvc.showEditStorm();
        }

        function handleAfterSave(stormFromApi) {
            vm.storms.push(stormFromApi);
        }

        function handleAfterEditStorm(stormFromApi) {
            if (stormFromApi.isDeleting) {
                vm.storms.splice(stormFromApi.stormIndex, 1);
            } else {
                vm.storms[stormFromApi.stormIndex] = stormFromApi;
            }
        }

    }
})();