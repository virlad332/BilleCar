using BilleCar.BOL;
using BilleCar.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BLL
{
    public class AdditionalPointBs
    {
        private AdditionalPointDb objDb;

        public AdditionalPointBs()
        {
            objDb = new AdditionalPointDb();
        }
        public ICollection<AdditionalPoint> GetAll()
        {
            return objDb.GetAll().ToList();
        }
        public ICollection< AdditionalPoint> GetByAnnouncementId(int Id)
        {
            return objDb.GetByAnnouncementId(Id);
        }

        public bool Insert(AdditionalPoint additionalPoint)
        {
            if (IsValidOnInsert(additionalPoint))
            {
                objDb.Insert(additionalPoint);
                return true;
            }
            else
                return false;

        }
        public void Delete(int Id)
        {
            objDb.Delete(Id);
        }
        public bool Update(AdditionalPoint additionalPoint)
        {
            if (IsValidOnUpdate(additionalPoint))
            {
                objDb.Update(additionalPoint);
                return true;
            }
            else
                return false;

        }
        public bool IsValidOnInsert(AdditionalPoint additionalPoint)
        {
            return true;
        }
        public bool IsValidOnUpdate(AdditionalPoint additionalPoint)
        {
            return true;
        }
    }
}
