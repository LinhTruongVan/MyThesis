namespace ApiServer.Models.Location
{
    public class WarningLocation : Location
    {
        public WarningLocationType WarningLocationType { get; set; }
        public int UserId { get; set; }
    }
}