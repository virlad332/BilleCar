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
    public class UserController : ApiController
    {
        UserBs userObjBs;
        public UserController()
        {
            userObjBs = new UserBs();
        }
        [ResponseType(typeof(ICollection<User>))]
        public IHttpActionResult Get()
        {
            return Ok(userObjBs.GetAll());
        }
        [ResponseType(typeof(ICollection<User>))]
        public IHttpActionResult Get(string email)
        {
            return Ok(userObjBs.GetByEmailString(email));
        }
        [ResponseType(typeof(User))]
        public IHttpActionResult Post(User user)
        {
            if (ModelState.IsValid)
            {

                if (userObjBs.Insert(user))
                {
                    return CreatedAtRoute("DefaultApi", new { email = user.Email }, user);
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
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
