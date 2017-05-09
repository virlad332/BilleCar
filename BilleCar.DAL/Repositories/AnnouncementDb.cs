using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.DAL.Repositories
{
    public class AnnouncementDb : DALBase
    {
        public ICollection<Announcement> GetAll()
        {
            return db.Announcements.ToList();
        }
        public Announcement GetByID(int Id)
        {
            return db.Announcements.Find(Id);
        }
        //public ICollection<Announcement> GetByAutorEmail(string email)
        //{
        //    return db.Announcements.Where(x => x.AutorRefUser == email).ToList();
        //}
        public int GetUserAnnouncementsCount(string email)
        {
            return db.Announcements.Where(x => x.AutorRefUser == email).Count();
        }
        public void Insert(Announcement announcement)
        {
            db.Announcements.Add(announcement);
            Save();
        }
        public void Delete(int Id)
        {
            Announcement announcement = db.Announcements.Find(Id);
            db.Announcements.Remove(announcement);
            Save();
        }
        public void Update(Announcement announcement)
        {
            db.Entry(announcement).State = EntityState.Modified;
            db.Configuration.ValidateOnSaveEnabled = false;
            Save();
            db.Configuration.ValidateOnSaveEnabled = true;
        }
        public void Save()
        {
            db.SaveChanges();
        }

    }
}
