using System;
using System.Web.Http;
using ApiServer.Models.Storm;
using ServerApi.DAL;

namespace ApiServer.Controllers
{
    [RoutePrefix("api/storms")]
    public class StormController: ApiController
    {
        private readonly ThesisContext _context = new ThesisContext();

        [Route("")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] Storm storm)
        {
            try
            {
                _context.Storms.Add(storm);
                _context.SaveChanges();

                return Ok(storm);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}