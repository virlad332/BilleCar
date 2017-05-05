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
    public class AdditionalPointController : ApiController
    {
        AdditionalPointBs additionalPointObjBs;
        public AdditionalPointController()
        {
            additionalPointObjBs = new AdditionalPointBs();
        }
        [ResponseType(typeof(ICollection<AdditionalPoint>))]
        public IHttpActionResult Get()
        {
            return Ok(additionalPointObjBs.GetAll());
        }
        [ResponseType(typeof(ICollection<AdditionalPoint>))]
        public IHttpActionResult Get(int id)
        {
            AdditionalPoint additionalPoint = additionalPointObjBs.GetByID(id);
            if (additionalPoint != null)
                return Ok(additionalPoint);
            else
                return NotFound();
        }

        [ResponseType(typeof(ICollection<AdditionalPoint>))]
        public IHttpActionResult Post(AdditionalPoint additionalPoint)
        {
            if (ModelState.IsValid)
            {
                additionalPointObjBs.Insert(additionalPoint);
                return CreatedAtRoute("DefaultApi", new { id = additionalPoint.AdditionalPointId }, additionalPoint);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseType(typeof(ICollection<AdditionalPoint>))]
        public IHttpActionResult Put(AdditionalPoint additionalPoint)
        {
            //if (ModelState.IsValid)
            //{
            //    additionalPointObjBs.Update(additionalPoint);
            //    return Ok(additionalPoint);
            //}
            //else
            //{
            //    return BadRequest(ModelState);
            //}
            if (ModelState.IsValid)
            {
                additionalPointObjBs.Update(additionalPoint);
                return Ok(additionalPoint);// CreatedAtRoute("DefaultApi", new { id = additionalPoint.AdditionalPointId }, additionalPoint);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseType(typeof(ICollection<AdditionalPoint>))]
        public IHttpActionResult Delete(int id)
        {
            AdditionalPoint additionalPoint = additionalPointObjBs.GetByID(id);
            if (additionalPoint != null)
            {
                additionalPointObjBs.Delete(id);
                return Ok(additionalPoint);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
