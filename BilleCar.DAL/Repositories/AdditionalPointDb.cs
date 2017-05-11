using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.DAL.Repositories
{
    public class AdditionalPointDb : DALBase
    {
        public ICollection<AdditionalPoint> GetAll()
        {
            return db.AdditionalPoints.ToList();
        }
        public ICollection<AdditionalPoint> GetByAnnouncementId(int Id)
        {
            return db.AdditionalPoints.Where(x => x.AnnouncementId == Id).ToList();
        }

        public void Insert(AdditionalPoint additionalPoint)
        {
            db.AdditionalPoints.Add(additionalPoint);
            Save();
        }
        public void Delete(int Id)
        {
            AdditionalPoint additionalPoint = db.AdditionalPoints.Find(Id);
            db.AdditionalPoints.Remove(additionalPoint);
            Save();
        }
        public void Update(AdditionalPoint additionalPoint)
        {
            db.Entry(additionalPoint).State = EntityState.Modified;
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
