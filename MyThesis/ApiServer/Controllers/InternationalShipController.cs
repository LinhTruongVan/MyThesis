using System.Web.Http;
using System.Web.Routing;
using ApiServer.Models.Ship;
using ApiServer.Services;
using ServerApi.DAL;

namespace ApiServer.Controllers
{
    [RoutePrefix("api/internation-ship-data")]
    public class InternationalShipController:ApiController
    {
        private readonly ThesisContext _context = new ThesisContext();

        [Route("")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] InternationalShip internationalShip)
        {
            _context.InternationalShips.Add(internationalShip);
            _context.SaveChanges();

            return Ok();
        }
    }
}