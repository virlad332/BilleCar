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
    public class DepartmentController : ApiController
    {

        DepartmentBs departmentObjBs;
        public DepartmentController()
        {
            departmentObjBs = new DepartmentBs();
        }
        [ResponseType(typeof(ICollection<Department>))]
        public IHttpActionResult Get()
        {
            return Ok(departmentObjBs.GetAll());
        }
        [ResponseType(typeof(ICollection<Department>))]
        public IHttpActionResult Get(int id)
        {
            Department department = departmentObjBs.GetByID(id);
            if (department != null)
                return Ok(department);
            else
                return NotFound();
        }
    }
}
