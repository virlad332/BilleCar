namespace BilleCar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class cascadedelete : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AdditionalPoints", "AnnouncementId", "dbo.Announcements");
            DropIndex("dbo.AdditionalPoints", new[] { "AnnouncementId" });
            AddColumn("dbo.AdditionalPoints", "Announcement_AnnouncementId", c => c.Int());
            AddColumn("dbo.Announcements", "AdditionalPoint_AdditionalPointId", c => c.Int());
            CreateIndex("dbo.AdditionalPoints", "Announcement_AnnouncementId");
            CreateIndex("dbo.Announcements", "AdditionalPoint_AdditionalPointId");
            AddForeignKey("dbo.AdditionalPoints", "Announcement_AnnouncementId", "dbo.Announcements", "AnnouncementId");
            AddForeignKey("dbo.Announcements", "AdditionalPoint_AdditionalPointId", "dbo.AdditionalPoints", "AdditionalPointId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Announcements", "AdditionalPoint_AdditionalPointId", "dbo.AdditionalPoints");
            DropForeignKey("dbo.AdditionalPoints", "Announcement_AnnouncementId", "dbo.Announcements");
            DropIndex("dbo.Announcements", new[] { "AdditionalPoint_AdditionalPointId" });
            DropIndex("dbo.AdditionalPoints", new[] { "Announcement_AnnouncementId" });
            DropColumn("dbo.Announcements", "AdditionalPoint_AdditionalPointId");
            DropColumn("dbo.AdditionalPoints", "Announcement_AnnouncementId");
            CreateIndex("dbo.AdditionalPoints", "AnnouncementId");
            AddForeignKey("dbo.AdditionalPoints", "AnnouncementId", "dbo.Announcements", "AnnouncementId");
        }
    }
}
