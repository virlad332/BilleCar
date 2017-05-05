using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BOL
{
    public partial class Department
    {
        [Key]
        public int DepartmentId { get; set; }
        public string Name { get; set; }
        public string Adress { get; set; }
        public virtual ICollection<User> User { get; set; }
        public virtual ICollection<Announcement> Announcment { get; set; }
    }
}
