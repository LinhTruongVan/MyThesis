using System.Collections.Generic;
using ApiServer.Models.Location;
using ApiServer.Services;

namespace ApiServer.Models.SummaryData
{
    public class SummaryData
    {
        public List<Ship.Ship> Ships { get; set; }
        public List<User.User> Users { get; set; }
        public List<WarningLocation> WarningLocations { get; set; }
        public InternationShipData InternationShipData { get; set; }
        public List<Storm.Storm> Storms { get; set; }
    }
}