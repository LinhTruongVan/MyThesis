using System;
using System.Linq;
using System.Web.Http;
using ApiServer.Models.Location;
using ServerApi.DAL;

namespace ApiServer.Controllers
{
    [RoutePrefix("api/warning-locations")]
    public class WarningLocationController : ApiController
    {
        private readonly ThesisContext _context = new ThesisContext();

        [Route("")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] WarningLocation warningLocation)
        {
            try
            {
                _context.WarningLocations.Add(warningLocation);
                _context.SaveChanges();

                return Ok(warningLocation);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult GetAllWarningLocations()
        {
            try
            {
                var warningLocations = _context.WarningLocations.ToList();

                return Ok(warningLocations);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }


    }

}