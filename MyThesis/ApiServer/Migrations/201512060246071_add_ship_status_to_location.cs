namespace ApiServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_ship_status_to_location : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Locations", "ShipStatus", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Locations", "ShipStatus");
        }
    }
}
