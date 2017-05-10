using BilleCar.BOL;
using BilleCar.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BLL
{
    public class AnnouncementBs
    {
        private AnnouncementDb objDb;

        public AnnouncementBs()
        {
            objDb = new AnnouncementDb();
        }
        public ICollection<Announcement> GetAll()
        {
            return objDb.GetAll().ToList();
        }
        public Announcement GetByID(int Id)
        {
            return objDb.GetByID(Id);
        }
        public ICollection<Announcement> GetByAutorEmail(string email)
        {
            return objDb.GetByAutorEmail(email);
        }

        public bool Insert(Announcement announcement)
        {
            if (IsValidOnInsert(announcement))
            {
                objDb.Insert(announcement);
                return true;
            }
            else
                return false;
        }
        public void Delete(int Id)
        {
            objDb.Delete(Id);
        }
        public bool Update(Announcement announcement)
        {
            if (IsValidOnUpdate(announcement))
            {
                objDb.Update(announcement);
                return true;
            }
            else
                return false;

        }
        public bool IsValidOnInsert(Announcement announcement)
        {
            return true;
        }
        public bool IsValidOnUpdate(Announcement announcement)
        {
            return true;
        }
    }
}
