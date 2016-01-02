(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('signUpPageCtrl', signUpPageCtrl);

    signUpPageCtrl.$inject = ['spinnerUtilSvc', 'userSvc', 'userDataSvc', '$location'];

    function signUpPageCtrl(spinnerUtilSvc, userSvc, userDataSvc, $location) {
        var vm = this;

        vm.newUser = {};

        vm.overlay = angular.element(document.querySelector('#overlay'));

        vm.createUser = createUser;

        init();

        function init(){
        }

        function createUser() {
            if (validateNewUser() === false) return;

            spinnerUtilSvc.showSpinner('spinnerSearch', vm.overlay);
            userDataSvc.signup(vm.newUser).then(function (response) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                toastr.success('Đăng ký tài khoản thành công');

                $location.path('/dang-nhap');
            }, function (error) {
                spinnerUtilSvc.hideSpinner('spinnerSearch', vm.overlay);
                if (error.status === 400) {
                    toastr.error('Tài khoản ' + vm.newUser.UserName + 'đã tồn tại');
                } else {
                    toastr.error('Đăng ký tài khoản không thành công');
                }
            });
        }

        function validateNewUser() {
            if (!vm.newUser.UserName || vm.newUser.UserName.length <= 0) {
                toastr.error('Chưa nhập tên tài khoản');
                return false;
            }
            if (!vm.newUser.Phone || vm.newUser.Phone.length <= 0) {
                toastr.error('Chưa nhập số điện thoại liên lạc');
                return false;
            }
            if (!vm.newUser.FullName || vm.newUser.FullName.length <= 0) {
                toastr.error('Chưa nhập họ tên');
                return false;
            }
            if (!vm.newUser.Password || vm.newUser.Password.length <= 0) {
                toastr.error('Chưa nhập mật khẩu');
                return false;
            }
            

            return true;
        }

    }
    
})();