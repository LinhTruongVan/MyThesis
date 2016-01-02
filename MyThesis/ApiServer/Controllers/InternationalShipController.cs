using System.Web.Http;
using ApiServer.Models.Ship;
using ServerApi.DAL;

namespace ApiServer.Controllers
{
    [RoutePrefix("api/international-ship-data")]
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