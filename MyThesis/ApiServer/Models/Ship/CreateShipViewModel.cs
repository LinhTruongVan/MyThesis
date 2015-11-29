using ApiServer.Models.Location;

namespace ApiServer.Models.Ship
{
    public class CreateShipViewModel
    {
        public Ship Ship { get; set; }
        public ShipLocation ShipLocation { get; set; }
    }
}