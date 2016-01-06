using System;
using Newtonsoft.Json.Linq;

namespace ApiServer.Services
{

    public class SimpleLocation
    {
        public SimpleLocation(double a, double b)
        {
            Latitude = a;
            Longitude = b;
        }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
    public class GenerateShipLocationService
    {
        public double DegreesToRadians(double degrees)
        {
            const double degToRadFactor = Math.PI / 180;
            return degrees * degToRadFactor;
        }

        public double RadiansToDegrees(double radians)
        {
            const double radToDegFactor = 180 / Math.PI;
            return radians * radToDegFactor;
        }

        public SimpleLocation FindPointAtDistanceFrom(SimpleLocation startPoint, double initialBearingRadians, double distanceKilometres)
        {
            const double radiusEarthKilometres = 6371.01;
            var distRatio = distanceKilometres / radiusEarthKilometres;
            var distRatioSine = Math.Sin(distRatio);
            var distRatioCosine = Math.Cos(distRatio);

            var startLatRad = DegreesToRadians(startPoint.Latitude);
            var startLonRad = DegreesToRadians(startPoint.Longitude);

            var startLatCos = Math.Cos(startLatRad);
            var startLatSin = Math.Sin(startLatRad);

            var endLatRads = Math.Asin((startLatSin * distRatioCosine) + (startLatCos * distRatioSine * Math.Cos(initialBearingRadians)));

            var endLonRads = startLonRad
                + Math.Atan2(
                    Math.Sin(initialBearingRadians) * distRatioSine * startLatCos,
                    distRatioCosine - startLatSin * Math.Sin(endLatRads));

            return new SimpleLocation(RadiansToDegrees(endLatRads), RadiansToDegrees(endLonRads));
        }

        public JArray GetRandomInternationalShipLocation()
        {
            var location = new JArray();
            var rnd = new Random();
            var numberOfLocations = rnd.Next(10, 20);

            for (var i=0; i<numberOfLocations; i++)
            {
                location.Add(new JArray(16 - (float)3 * rnd.Next(0, 256) / 128, 110 + (float)3 * rnd.Next(0, 256) / 128));
            }

            return location;
        }
    }
}