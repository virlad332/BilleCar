using BilleCar.BLL;
using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace BilleCar.API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UserMyAnnouncementController : ApiController
    {
        AnnouncementBs announcementObjBs;
        public UserMyAnnouncementController()
        {
            announcementObjBs = new AnnouncementBs();
        }
        [ResponseType(typeof(ICollection<Announcement>))]
        public IHttpActionResult Get(string email)
        {
            return Ok(announcementObjBs.GetByAutorEmail(email));
        }

    }
}
