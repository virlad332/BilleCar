using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BOL
{
    public class AdditionalPoint
    {
        [Key]
        public int AdditionalPointId { get; set; }
        public string Adress { get; set; }
        public string Lat { get; set; }
        public string Lng { get; set; }
        public int? AnnouncementId { get; set; }

        public virtual Announcement Announcement { get; set; }

    }
}
