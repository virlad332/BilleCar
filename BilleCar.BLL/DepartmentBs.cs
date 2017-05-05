using BilleCar.BOL;
using BilleCar.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BLL
{
    public class DepartmentBs
    {
        private DepartmentDb objDb;

        public DepartmentBs()
        {
            objDb = new DepartmentDb();
        }
        public ICollection<Department> GetAll()
        {
            return objDb.GetAll().ToList();
        }
        public Department GetByID(int Id)
        {
            return objDb.GetByID(Id);
        }

        public bool Insert(Department department)
        {
            if (IsValidOnInsert(department))
            {
                objDb.Insert(department);
                return true;
            }
            else
                return false;

        }
        public void Delete(int Id)
        {
            objDb.Delete(Id);
        }
        public bool Update(Department department)
        {
            if (IsValidOnUpdate(department))
            {
                objDb.Update(department);
                return true;
            }
            else
                return false;

        }
        public bool IsValidOnInsert(Department department)
        {
            return true;
        }
        public bool IsValidOnUpdate(Department department)
        {
            return true;
        }
    }
}
