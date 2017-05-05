using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BOL
{
    public partial class User
    {
        public User()
        {
            RegisterDate = DateTime.Now;
            Role = "user";

        }

        public string Name { get; set; }
        public string SurName { get; set; }
        public string Pass { get; set; }
        public DateTime RegisterDate { get; set; }
        [Key]
        public string Email { get; set; }
        public int DepartmentRefId { get; set; }
        [ForeignKey("DepartmentRefId")]
        public Department DepartmentId { get; set; }
        public string Role { get; set; }
        public virtual ICollection<Announcement> AuthorEmail { get; set; }
        public virtual ICollection<AnnoucmentUser> UserEmail { get; set; }
    }
}
