using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.DAL.Repositories
{
    public class AnnoucmentUserDb : DALBase
    {
        public ICollection<AnnoucmentUser> GetAll()
        {
            return db.AnnoucmentUsers.ToList();
        }
        public AnnoucmentUser GetByID(int Id)
        {
            return db.AnnoucmentUsers.Find(Id);
        }
        public void Insert(AnnoucmentUser annoucmentUser)
        {
            db.AnnoucmentUsers.Add(annoucmentUser);
            Save();
        }
        public void Delete(int Id)
        {
            AnnoucmentUser annoucmentUser = db.AnnoucmentUsers.Find(Id);
            db.AnnoucmentUsers.Remove(annoucmentUser);
            Save();
        }
        public void Update(AnnoucmentUser annoucmentUser)
        {
            db.Entry(annoucmentUser).State = EntityState.Modified;
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
