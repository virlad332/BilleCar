﻿using BilleCar.BLL;
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
    public class ChangePasswordController : ApiController
    {
        UserBs userObjBs;
        public ChangePasswordController()
        {
            userObjBs = new UserBs();
        }
        [ResponseType(typeof(ICollection<User>))]
        public IHttpActionResult Put(User user)
        {
            if (ModelState.IsValid)
            {
                userObjBs.UpdatePassword(user);
                return Ok(user);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

    }
}
