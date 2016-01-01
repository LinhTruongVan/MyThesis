(function () {
    'use strict';

    angular
        .module('app')
        .controller('lawCtrl', lawCtrl);

    lawCtrl.$inject = ['userSvc', '$location'];

    function lawCtrl(userSvc, $location) {
        var vm = this;

        vm.modes = ['LUẬT BIỂN VIỆT NAM','BẢO VỆ VÀ PHÁT TRIỂN NGUỒN LỢI THUỶ SẢN - LUẬT THỦY SẢN', 'KHAI THÁC THUỶ SẢN - LUẬT THỦY SẢN', 'TÀU CÁ VÀ CƠ SỞ DỊCH VỤ HOẠT ĐỘNG THUỶ SẢN - LUẬT THỦY SẢN',
        'QUY ĐỊNH VỀ XỬ PHẠT VI PHẠM HÀNH CHÍNH TRONG HOẠT ĐỘNG THỦY SẢN - NGHỊ ĐỊNH 103/2013/NÐ-CP'];
        vm.mode = vm.modes[0];

        vm.logout = logout;

        init();

        function init() {
            userSvc.validateCurrentUser();
            vm.currentUser = userSvc.getCurrentUser();

        }

        function logout() {
            userSvc.setCurrentUser({});
            $location.path('/login');
            sessionStorage.removeItem('user');
        }
    }

})();