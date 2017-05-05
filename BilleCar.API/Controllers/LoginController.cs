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
    public class LoginController : ApiController
    {
        UserBs userObjBs;
        public LoginController()
        {
            userObjBs = new UserBs();
        }

        [ResponseType(typeof(User))]
        public IHttpActionResult Post(User usr)
        {
            if (userObjBs.GetByEmail(ref usr))
            {
                return Ok(usr);
            }
            else
            {
                foreach (var error in userObjBs.Errors)
                {
                    ModelState.AddModelError("", error);
                }
                return BadRequest(ModelState);
            }
        }
    }
}
