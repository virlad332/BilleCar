using BilleCar.BOL;
using BilleCar.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BLL
{
    public class AnnoucmentUserBs
    {
        private AnnoucmentUserDb objDb;

        public AnnoucmentUserBs()
        {
            objDb = new AnnoucmentUserDb();
        }
        public ICollection<AnnoucmentUser> GetAll()
        {
            return objDb.GetAll().ToList();
        }

        public AnnoucmentUser GetByID(int Id)
        {
            return objDb.GetByID(Id);
        }
        public bool Insert(AnnoucmentUser annoucmentUser)
        {
            if (IsValidOnInsert(annoucmentUser))
            {
                objDb.Insert(annoucmentUser);
                return true;
            }
            else
                return false;

        }
        public void Delete(int Id)
        {
            objDb.Delete(Id);
        }
        public bool Update(AnnoucmentUser annoucmentUser)
        {
            if (IsValidOnUpdate(annoucmentUser))
            {
                objDb.Update(annoucmentUser);
                return true;
            }
            else
                return false;

        }
        public bool IsValidOnInsert(AnnoucmentUser annoucmentUser)
        {
            return true;
        }
        public bool IsValidOnUpdate(AnnoucmentUser AnnoucmentUser)
        {
            return true;
        }
    }
}
