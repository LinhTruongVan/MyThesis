namespace ApiServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateDb : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Locations", "Name", c => c.String());
            AddColumn("dbo.Locations", "Radius", c => c.Single());
            AlterColumn("dbo.Locations", "Latitude", c => c.Double(nullable: false));
            AlterColumn("dbo.Locations", "Longitude", c => c.Double(nullable: false));
            DropTable("dbo.Storms");
        }
        
        public override void Down()
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
            
            AlterColumn("dbo.Locations", "Longitude", c => c.Single(nullable: false));
            AlterColumn("dbo.Locations", "Latitude", c => c.Single(nullable: false));
            DropColumn("dbo.Locations", "Radius");
            DropColumn("dbo.Locations", "Name");
        }
    }
}
