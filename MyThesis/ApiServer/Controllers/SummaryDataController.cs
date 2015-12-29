using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web.Http;
using ApiServer.Models.Ship;
using ApiServer.Models.SummaryData;
using ApiServer.Models.User;
using ApiServer.Services;
using ServerApi.DAL;

namespace ApiServer.Controllers
{
    [RoutePrefix("api/users/{userId}/summary-data")]
    public class SummaryDataController : ApiController
    {
        private readonly ThesisContext _context = new ThesisContext();
        private readonly InternationalShipService _internationalShipService = new InternationalShipService();

        [Route("")]
        [HttpGet]
        public IHttpActionResult Get(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null) return NotFound();

            var summaryData = new SummaryData()
            {
                WarningLocations = _context.WarningLocations.ToList(),
                InternationShipData = _internationalShipService.GetInternationShipData(),
                Storms = _context.Storms.ToList()
            };

            var ships = _context.Ships.Include(s => s.ShipLocations).ToList();

            if (user.UserRole == UserRole.User)
            {
                summaryData.Ships = ships.Where(s => s.UserId == user.Id).ToList();
                summaryData.Users = new List<User>() {user};
            }
            else if (user.UserRole == UserRole.Admin)
            {
                summaryData.Ships = ships;
                summaryData.Users = _context.Users.ToList();
            }

            return Ok(summaryData);
        }

    }
}