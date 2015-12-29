namespace ApiServer.Models.Storm
{
    public class Storm:Location.Location
    {
        public string Name { get; set; }
        public float Radius { get; set; }

    }
}