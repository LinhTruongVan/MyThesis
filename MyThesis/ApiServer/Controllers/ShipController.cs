using System.Linq;
using System.Web.Http;
using ApiServer.Models.Ship;
using ServerApi.DAL;
using System.Data.Entity;

namespace ApiServer.Controllers
{
    [RoutePrefix("api/ships")]
    public class ShipController : ApiController
    {
        private readonly ThesisContext _context = new ThesisContext();

        [Route("")]
        [HttpPost]
        public IHttpActionResult CreateShip([FromBody] CreateShipViewModel createShipViewModel)
        {
            _context.Ships.Add(createShipViewModel.Ship);
            createShipViewModel.ShipLocation.ShipId = createShipViewModel.Ship.Id;
            _context.Locations.Add(createShipViewModel.ShipLocation);
            _context.SaveChanges();

            return Ok(createShipViewModel);
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult GetAllShips()
        {
            var ships = _context.Ships.Include(s=>s.ShipLocations).ToList();

            return Ok(ships);
        }


        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult GetShip(int id)
        {
            var ship = _context.Ships.FirstOrDefault(item => item.Id == id);
            if (ship == null) return BadRequest();

            return Ok(ship);
        }

        [Route("{id}")]
        [HttpPut]
        public IHttpActionResult UpdateShip(int id, [FromBody] Ship updatedShip)
        {
            var ship = _context.Ships.FirstOrDefault(item => item.Id == id);
            if (ship == null) return NotFound();

            ship.Id = updatedShip.Id;
            ship.Caption = updatedShip.Caption;
            ship.Sailors = updatedShip.Sailors;
            ship.ShipStatus = updatedShip.ShipStatus;

            _context.SaveChanges();

            return Ok(ship);
        }

        [Route("{id}")]
        [HttpDelete]
        public IHttpActionResult RemoveShip(int id)
        {
            var ship = _context.Ships.FirstOrDefault(item => item.Id == id);
            if (ship == null) return NotFound();
            _context.Ships.Remove(ship);
            _context.SaveChanges();

            return Ok(ship);
        }

    }

}