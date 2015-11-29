namespace ApiServer.Models.Location
{
    public class ShipLocation : Location
    {
        public int ShipId { get; set; }
        public int Angle { get; set; }
    }
}