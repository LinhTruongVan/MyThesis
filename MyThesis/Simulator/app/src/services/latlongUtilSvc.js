(function () {
    angular
	.module('app')
	.service('latlongUtilSvc', latlongUtilSvc);

    latlongUtilSvc.$inject = ['latlongConst'];

    function latlongUtilSvc(latlongConst) {
        var latlongs = latlongConst.latlongs;
        var numberOfLatlongs = latlongs.length;

        return {
            calculateNewLatlong: calculateNewLatlong,
            getRandomLatlong: getRandomLatlong
        };

        function calculateNewLatlong(lat, lng, brng, dist) {
            var originalBrng = brng;

            dist = dist / 6371;
            brng = toRad(brng);

            var lat1 = toRad(lat),
            lon1 = toRad(lng);

            var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
              Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

            var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
              Math.cos(lat1),
              Math.cos(dist) - Math.sin(lat1) *
              Math.sin(lat2));

            if (isNaN(lat2) || isNaN(lon2)) return null;

            return {
                latitude: parseFloat(toDeg(lat2).toFixed(6)),
                longitude: parseFloat(toDeg(lon2).toFixed(6)),
                direction: originalBrng
            }

            function toRad(param) {
                return param * Math.PI / 180;
            }

            function toDeg(param) {
                return param * 180 / Math.PI;
            }


        }

        function getRandomLatlong() {
            var randomNumber = parseInt(Math.random() * numberOfLatlongs);

            return {
                latitude: latlongs[randomNumber][0],
                longitude: latlongs[randomNumber][1]
            }
        }


    }

})();