using System;

namespace ApiServer.Models.Location
{
    public abstract class Location
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Description { get; set; }
    }
}