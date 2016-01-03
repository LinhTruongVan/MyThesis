namespace ApiServer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initWarning : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Locations", "UserId", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Locations", "UserId");
        }
    }
}
