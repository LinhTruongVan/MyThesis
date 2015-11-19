(function() {
    angular
        .module('app')
        .service('spinnerUtilSvc', spinnerUtilSvc);
    spinnerUtilSvc.$inject = ['usSpinnerService'];

    function spinnerUtilSvc(usSpinnerService) {
        var service = {
            showSpinner: showSpinner,
            hideSpinner: hideSpinner
        };
        return service;

        function showSpinner(key, overlay) {
            usSpinnerService.spin(key);
            overlay.show();
        }

        function hideSpinner(key, overlay) {
            usSpinnerService.stop(key);
            overlay.hide();
        }
    }
})();