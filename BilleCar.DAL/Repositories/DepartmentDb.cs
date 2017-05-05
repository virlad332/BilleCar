using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.DAL.Repositories
{
    public class DepartmentDb : DALBase
    {
        public ICollection<Department> GetAll()
        {
            return db.Departments.ToList();
        }
        public Department GetByID(int Id)
        {
            return db.Departments.Find(Id);
        }

        public void Insert(Department department)
        {
            db.Departments.Add(department);
            Save();
        }
        public void Delete(int Id)
        {
            Department department = db.Departments.Find(Id);
            db.Departments.Remove(department);
            Save();
        }
        public void Update(Department department)
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
