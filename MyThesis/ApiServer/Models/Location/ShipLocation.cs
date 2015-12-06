using System.ComponentModel.DataAnnotations;
using ApiServer.Models.Ship;

namespace ApiServer.Models.Location
{
    public class ShipLocation : Location
    {
        public int ShipId { get; set; }
        public int Angle { get; set; }

        [Required]
        public ShipStatus ShipStatus { get; set; }
    }
}