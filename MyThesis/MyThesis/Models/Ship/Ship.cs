using System;
using System.Collections.Generic;
using MyThesis.Models.Location;

namespace MyThesis.Models.Ship
{
    public class Ship
    {
        public int Id { get; set; }
        public ShipType ShipType { get; set; }
        public int Speed { get; set; }
        public int Weight { get; set; }
        public ShipStatus ShipStatus { get; set; }
        public string Caption { get; set; }
        public int Sailors { get; set; }
        public string Phone { get; set; }
        public DateTime SailedAt { get; set; }
        public virtual  ICollection<ShipLocation> ShipLocations  { get; set; }
    }
}