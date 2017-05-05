namespace BilleCar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AdditionalPoints",
                c => new
                    {
                        AdditionalPointId = c.Int(nullable: false, identity: true),
                        Adress = c.String(),
                        Lat = c.String(),
                        Lng = c.String(),
                        AnnouncementId = c.Int(),
                    })
                .PrimaryKey(t => t.AdditionalPointId)
                .ForeignKey("dbo.Announcements", t => t.AnnouncementId)
                .Index(t => t.AnnouncementId);
            
            CreateTable(
                "dbo.Announcements",
                c => new
                    {
                        AnnouncementId = c.Int(nullable: false, identity: true),
                        AutorRefUser = c.String(maxLength: 128),
                        DepartmentRefId = c.Int(nullable: false),
                        StartPlace = c.String(),
                        EndPlace = c.String(),
                        AddDate = c.DateTime(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        FreeSlots = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AnnouncementId)
                .ForeignKey("dbo.Users", t => t.AutorRefUser)
                .ForeignKey("dbo.Departments", t => t.DepartmentRefId, cascadeDelete: true)
                .Index(t => t.AutorRefUser)
                .Index(t => t.DepartmentRefId);
            
            CreateTable(
                "dbo.AnnoucmentUsers",
                c => new
                    {
                        AnnoucmentUserId = c.Int(nullable: false, identity: true),
                        AnnoucmentUserRef = c.String(maxLength: 128),
                        AnnoucmentUserRefAnnoucment = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AnnoucmentUserId)
                .ForeignKey("dbo.Announcements", t => t.AnnoucmentUserRefAnnoucment, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.AnnoucmentUserRef)
                .Index(t => t.AnnoucmentUserRef)
                .Index(t => t.AnnoucmentUserRefAnnoucment);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Email = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                        SurName = c.String(),
                        Pass = c.String(),
                        RegisterDate = c.DateTime(nullable: false),
                        DepartmentRefId = c.Int(nullable: false),
                        Role = c.String(),
                    })
                .PrimaryKey(t => t.Email)
                .ForeignKey("dbo.Departments", t => t.DepartmentRefId, cascadeDelete: true)
                .Index(t => t.DepartmentRefId);
            
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        DepartmentId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Adress = c.String(),
                    })
                .PrimaryKey(t => t.DepartmentId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AnnoucmentUsers", "AnnoucmentUserRef", "dbo.Users");
            DropForeignKey("dbo.Users", "DepartmentRefId", "dbo.Departments");
            DropForeignKey("dbo.Announcements", "DepartmentRefId", "dbo.Departments");
            DropForeignKey("dbo.Announcements", "AutorRefUser", "dbo.Users");
            DropForeignKey("dbo.AnnoucmentUsers", "AnnoucmentUserRefAnnoucment", "dbo.Announcements");
            DropForeignKey("dbo.AdditionalPoints", "AnnouncementId", "dbo.Announcements");
            DropIndex("dbo.Users", new[] { "DepartmentRefId" });
            DropIndex("dbo.AnnoucmentUsers", new[] { "AnnoucmentUserRefAnnoucment" });
            DropIndex("dbo.AnnoucmentUsers", new[] { "AnnoucmentUserRef" });
            DropIndex("dbo.Announcements", new[] { "DepartmentRefId" });
            DropIndex("dbo.Announcements", new[] { "AutorRefUser" });
            DropIndex("dbo.AdditionalPoints", new[] { "AnnouncementId" });
            DropTable("dbo.Departments");
            DropTable("dbo.Users");
            DropTable("dbo.AnnoucmentUsers");
            DropTable("dbo.Announcements");
            DropTable("dbo.AdditionalPoints");
        }
    }
}
