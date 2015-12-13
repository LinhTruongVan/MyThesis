(function() {
    angular
        .module('app')
        .service('spinnerUtilSvc', spinnerUtilSvc);
    spinnerUtilSvc.$inject = ['usSpinnerService', '$timeout'];

    function spinnerUtilSvc(usSpinnerService, $timeout) {
        var service = {
            showSpinner: showSpinner,
            hideSpinner: hideSpinner
        };
        return service;

        function showSpinner(key, overlay) {
            $timeout(function () {
                usSpinnerService.spin(key);
            }, 100);
            overlay.show();
        }

        function hideSpinner(key, overlay) {
            usSpinnerService.stop(key);
            overlay.hide();
        }
    }
})();