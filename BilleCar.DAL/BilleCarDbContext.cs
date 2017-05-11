using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.DAL
{
    public class BilleCarDbContext : DbContext
    {
        public BilleCarDbContext() : base("BilleCarDb")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<BilleCarDbContext, BilleCar.DAL.Migrations.Configuration>());
            Configuration.ProxyCreationEnabled = false;
        }
        public DbSet<Department> Departments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<AnnoucmentUser> AnnoucmentUsers { get; set; }
        public DbSet<AdditionalPoint> AdditionalPoints { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Announcement>()
                .HasOptional(a => a.AdditionalPoint)
                .WithOptionalDependent()
                .WillCascadeOnDelete(true);
            //modelBuilder.Entity<AdditionalPoint>()
            //    .HasOptional(a => a.Announcement)
            //    .WithMany(a => a.AdditionalPoint)
            //    .HasForeignKey(a => a.AnnouncementId)
            //    .WillCascadeOnDelete(true);
        }


    }
}
