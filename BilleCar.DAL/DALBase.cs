using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.DAL
{
    public class DALBase
    {
        protected BilleCarDbContext db;

        public DALBase()
        {
            db = new BilleCarDbContext();
        }
    }
}
