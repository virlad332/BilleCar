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
        public AdditionalPoint GetByID(int Id)
        {
            return db.AdditionalPoints.Find(Id);
        }

        public void Insert(AdditionalPoint department)
        {
            db.AdditionalPoints.Add(department);
            Save();
        }
        public void Delete(int Id)
        {
            AdditionalPoint department = db.AdditionalPoints.Find(Id);
            db.AdditionalPoints.Remove(department);
            Save();
        }
        public void Update(AdditionalPoint department)
        {
            db.Entry(department).State = EntityState.Modified;
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
