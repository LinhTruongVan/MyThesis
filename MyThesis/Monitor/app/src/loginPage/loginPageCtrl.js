(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('loginPageCtrl', loginPageCtrl);

    loginPageCtrl.$inject = ['spinnerUtilSvc', 'userSvc', 'userDataSvc', '$location'];

    function loginPageCtrl(spinnerUtilSvc, userSvc, userDataSvc, $location) {
        var vm = this;

        vm.user = {};
        vm.isUserExist = userSvc.isUserExist();

        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.login = login;

        init();

        function init() {
            //$(document).keypress(function (e) {
            //    if (e.which === 13) login();
            //});
        }

        function login() {
            if (!validateUser()) return;

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            userDataSvc.login(vm.user).then(function(response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                userSvc.setCurrentUser(response.data);
                $location.path('/trang-chu');
            }, function(error) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                if (error.status === 404 || error.status === 400) {
                    toastr.error('Tài khoản/ Mật khẩu không đúng');
                } else {
                    toastr.error('Đăng nhập không thành công');
                }
            });
        }

        function validateUser() {
            if (!vm.user.UserName || vm.user.UserName.length <= 0) {
                toastr.error('Chưa nhập tài khoản');
                return false;
            }

            if (!vm.user.Password || vm.user.Password.length <= 0) {
                toastr.error('Chưa nhập mật khẩu');
                return false;
            }

            return true;
        }

    }
    
})();