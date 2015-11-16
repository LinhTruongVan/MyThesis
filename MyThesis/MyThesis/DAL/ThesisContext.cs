using System.Data.Entity;
using MyThesis.Models.Location;
using MyThesis.Models.Ship;

namespace MyThesis.DAL
{
    public class ThesisContext: DbContext
    {
        public ThesisContext() : base("ThesisContext")
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Ship> Ships { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<WarningLocation> WarningLocations { get; set; }
        public DbSet<ShipLocation> ShipLocations { get; set; }
    }
}