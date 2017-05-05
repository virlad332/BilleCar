using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BOL
{
    public partial class AnnoucmentUser
    {
        [Key]
        public int AnnoucmentUserId { get; set; }
        public string AnnoucmentUserRef { get; set; }
        [ForeignKey("AnnoucmentUserRef")]
        public User UserEmail { get; set; }
        public int AnnoucmentUserRefAnnoucment { get; set; }
        [ForeignKey("AnnoucmentUserRefAnnoucment")]
        public Announcement AnnoucmentId { get; set; }
    }
}
