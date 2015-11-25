using MyThesis.Models.User;

namespace MyThesis.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<DAL.ThesisContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DAL.ThesisContext context)
        {
            context.Users.AddOrUpdate(
                new User()
                {
                    UserName = "admin",
                    Password = "admin",
                    UserRole = 0
                }
            );
            context.SaveChanges();
        }
    }
}
