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
    public class AnnoucmentUserController : ApiController
    {
        AnnoucmentUserBs annoucmentUserObjBs;
        public AnnoucmentUserController()
        {
            annoucmentUserObjBs = new AnnoucmentUserBs();
        }
        [ResponseType(typeof(ICollection<AnnoucmentUser>))]
        public IHttpActionResult Get()
        {
            return Ok(annoucmentUserObjBs.GetAll());
        }
        [ResponseType(typeof(ICollection<AnnoucmentUser>))]
        public IHttpActionResult Get(int id)
        {
            AnnoucmentUser annoucmentUser = annoucmentUserObjBs.GetByID(id);
            if (annoucmentUser != null)
                return Ok(annoucmentUser);
            else
                return NotFound();
        }

        [ResponseType(typeof(ICollection<AnnoucmentUser>))]
        public IHttpActionResult Post(AnnoucmentUser annoucmentUser)
        {
            if (ModelState.IsValid)
            {
                annoucmentUserObjBs.Insert(annoucmentUser);
                return CreatedAtRoute("DefaultApi", new { id = annoucmentUser.AnnoucmentUserId }, annoucmentUser);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseType(typeof(ICollection<AnnoucmentUser>))]
        public IHttpActionResult Put(int id, AnnoucmentUser annoucmentUser)
        {
            if (ModelState.IsValid)
            {
                annoucmentUserObjBs.Update(annoucmentUser);
                return Ok(annoucmentUser);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseType(typeof(ICollection<AnnoucmentUser>))]
        public IHttpActionResult Delete(int id)
        {
            AnnoucmentUser annoucmentUser = annoucmentUserObjBs.GetByID(id);
            if (annoucmentUser != null)
            {
                annoucmentUserObjBs.Delete(id);
                return Ok(annoucmentUser);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
