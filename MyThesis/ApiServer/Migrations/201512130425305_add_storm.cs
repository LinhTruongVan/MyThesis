namespace ApiServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_storm : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Storms",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Latitude = c.Single(nullable: false),
                        Longitude = c.Single(nullable: false),
                        Radius = c.Single(nullable: false),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Storms");
        }
    }
}
