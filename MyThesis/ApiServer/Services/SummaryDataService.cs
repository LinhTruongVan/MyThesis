using System.Device.Location;

namespace ApiServer.Services
{
    public class SummaryDataService
    {
        public bool IsInDanger(double x1, double y1, double x2, double y2, double distance)
        {
            var point1 = new GeoCoordinate(x1, y1);
            var point2 = new GeoCoordinate(x2, y2);

            return point1.GetDistanceTo(point2) <= (distance * 1000);
        }
    }
}