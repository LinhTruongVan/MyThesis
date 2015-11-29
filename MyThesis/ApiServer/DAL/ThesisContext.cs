using System.Configuration;
using System.Data.Entity;
using ApiServer.Models.Location;
using ApiServer.Models.Ship;
using ApiServer.Models.User;

namespace ServerApi.DAL
{
    public class ThesisContext : DbContext
    {
        public ThesisContext()
            : base("ThesisContext")
        {
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Ship> Ships { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<WarningLocation> WarningLocations { get; set; }
        public DbSet<ShipLocation> ShipLocations { get; set; }
        public DbSet<User> Users { get; set; }
    }
}