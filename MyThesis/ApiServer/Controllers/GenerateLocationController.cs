using System;
using System.Collections.Generic;
using System.Web.Http;
using ApiServer.Models.Location;
using ApiServer.Models.Ship;
using ServerApi.DAL;

namespace ApiServer.Controllers
{
    [RoutePrefix("api/data")]
    public class GenerateLocationController:ApiController
    {
        private readonly ThesisContext _context = new ThesisContext();

        [Route("")]
        [HttpGet]
        public IHttpActionResult GenerateData()
        {
            int shipId = 102;
            double latitude = 18.843913;
            double longitude = 105.702209;
            double distance = 20;

            var angles = new List<int>() { 70, 120, 90 };
            var timestamp = new DateTime(2015,12,29,7,30,0);

            var shipLocation = new ShipLocation()
            {
                ShipId = shipId,
                Latitude = latitude,
                Longitude = longitude,
                Angle = 90,
                CreatedAt = timestamp,
                ShipStatus = ShipStatus.Normal
            };
            _context.ShipLocations.Add(shipLocation);

            for (var i=0; i<11; i++)
            {
                var tempLocation = FindPointAtDistanceFrom(new TestData(latitude, longitude), 90, distance);
                latitude = tempLocation.Latitude;
                longitude = tempLocation.Longitude;
                timestamp = timestamp.AddMinutes(30);

                _context.ShipLocations.Add(new ShipLocation()
                {
                    ShipId = shipId,
                    Latitude = latitude,
                    Longitude = longitude,
                    Angle = 90,
                    CreatedAt = timestamp,
                    ShipStatus = ShipStatus.Normal
                });
            }

            foreach (var angle in angles)
            {
                for (int i = 0; i < 12; i++)
                {
                    var tempLocation2 = FindPointAtDistanceFrom(new TestData(latitude, longitude), 90, distance);
                    latitude = tempLocation2.Latitude;
                    longitude = tempLocation2.Longitude;
                    timestamp = timestamp.AddMinutes(30);

                    _context.ShipLocations.Add(new ShipLocation()
                    {
                        ShipId = shipId,
                        Latitude = latitude,
                        Longitude = longitude,
                        Angle = angle,
                        CreatedAt = timestamp,
                        ShipStatus = ShipStatus.Normal
                    });
                }
            }

            _context.SaveChanges();

            return Ok();
        }

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

        public TestData FindPointAtDistanceFrom(TestData startPoint, double initialBearingRadians, double distanceKilometres)
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

            return new TestData(RadiansToDegrees(endLatRads), RadiansToDegrees(endLonRads));
        }

        public class TestData
        {
            public TestData(double a, double b)
            {
                Latitude = a;
                Longitude = b;
            }
            public double Latitude { get; set; }
            public double Longitude { get; set; }
        }
    }
}