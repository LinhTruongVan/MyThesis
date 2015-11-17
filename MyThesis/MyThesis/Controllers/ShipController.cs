using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using MyThesis.DAL;
using MyThesis.Models.Ship;

namespace MyThesis.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/ships")]
    public class ShipController: ApiController
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
            var ships = _context.Ships.Include("ShipLocations").ToList();

            return Ok(ships);
        }


        [Route("{id}")]
        [HttpGet]
        public IHttpActionResult GetShip(int id)
        {
            var ship = _context.Ships.FirstOrDefault(item => item.Id == id);
            if(ship == null) return BadRequest();

            return Ok(ship);
        }

        [Route("{id}")]
        [HttpPut]
        public IHttpActionResult UpdateShip(int id, [FromBody] Ship updatedShip)
        {
            if (id != updatedShip.Id) return BadRequest();
            var ship = _context.Ships.FirstOrDefault(item => item.Id == id);
            if (ship == null) return NotFound();

            ship.Id = updatedShip.Id;
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

            return Ok(ship);
        }

    }
}