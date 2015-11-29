using ApiServer.Models.User;

namespace ApiServer.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ServerApi.DAL.ThesisContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ServerApi.DAL.ThesisContext context)
        {
            context.Users.AddOrUpdate(new User()
            {
                UserName = "admin",
                Password = "admin"
            });
            context.SaveChanges();
        }
    }
}
