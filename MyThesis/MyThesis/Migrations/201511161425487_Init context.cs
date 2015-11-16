namespace MyThesis.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initcontext : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Latitude = c.Single(nullable: false),
                        Longitude = c.Single(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        Description = c.String(),
                        ShipId = c.Int(),
                        Angle = c.Int(),
                        WarningLocationType = c.Int(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Ships", t => t.ShipId, cascadeDelete: true)
                .Index(t => t.ShipId);
            
            CreateTable(
                "dbo.Ships",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ShipType = c.Int(nullable: false),
                        Speed = c.Int(nullable: false),
                        Weight = c.Int(nullable: false),
                        ShipStatus = c.Int(nullable: false),
                        Caption = c.String(),
                        Sailors = c.Int(nullable: false),
                        Phone = c.String(),
                        SailedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Locations", "ShipId", "dbo.Ships");
            DropIndex("dbo.Locations", new[] { "ShipId" });
            DropTable("dbo.Ships");
            DropTable("dbo.Locations");
        }
    }
}
