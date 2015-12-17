(function () {
    'use strict';

    angular
        .module('app')
        .controller('lawCtrl', lawCtrl);

    lawCtrl.$inject = [];

    function lawCtrl() {
        var vm = this;

        vm.modes = ['BẢO VỆ VÀ PHÁT TRIỂN NGUỒN LỢI THUỶ SẢN - LUẬT THỦY SẢN', 'KHAI THÁC THUỶ SẢN - LUẬT THỦY SẢN', 'TÀU CÁ VÀ CƠ SỞ DỊCH VỤ HOẠT ĐỘNG THUỶ SẢN - LUẬT THỦY SẢN',
        'QUY ĐỊNH VỀ XỬ PHẠT VI PHẠM HÀNH CHÍNH TRONG HOẠT ĐỘNG THỦY SẢN - NGHỊ ĐỊNH 103/2013/NÐ-CP'];
        vm.mode = vm.modes[0];
    }

})();