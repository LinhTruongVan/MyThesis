using System;

namespace MyThesis.Models.Location
{
    public abstract class Location
    {
        public int Id { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Description { get; set; }
    }
}