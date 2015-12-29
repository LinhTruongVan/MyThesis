using System;
using System.Linq;
using System.Web.Http;
using ApiServer.Models.Location;
using ServerApi.DAL;

namespace ApiServer.Controllers
{
    [RoutePrefix("api/ships/{shipId}/locations")]
    public class ShipLocationController : ApiController
    {
        private readonly ThesisContext _context = new ThesisContext();

        [Route("")]
        [HttpPost]
        public IHttpActionResult CreateShipLocation(int shipId, [FromBody] ShipLocation shipLocation)
        {
            try
            {
                var ship = _context.Ships.FirstOrDefault(p => p.Id == shipId);
                if (ship == null) return NotFound();

                shipLocation.ShipId = ship.Id;
                _context.ShipLocations.Add(shipLocation);
                _context.SaveChanges();

                return Ok(shipLocation);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }

}