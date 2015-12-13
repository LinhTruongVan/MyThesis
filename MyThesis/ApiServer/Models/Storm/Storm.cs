namespace ApiServer.Models.Storm
{
    public class Storm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float Radius { get; set; }
        public string Description { get; set; }

    }
}