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

            var summaryData = new SummaryData();

            switch (user.UserRole)
            {
                case UserRole.User:
                    summaryData.Ships = _context.Ships.Include(s => s.ShipLocations).Where(s=>s.UserId == user.Id).ToList();
                    summaryData.WarningLocations = _context.WarningLocations.ToList();
                    summaryData.Users = new List<User>() { user };
                    summaryData.InternationShipData = _internationalShipService.GetInternationShipData();
                    break;
                case UserRole.Admin:
                    summaryData.Ships = _context.Ships.Include(s => s.ShipLocations).ToList();
                    summaryData.WarningLocations = _context.WarningLocations.ToList();
                    summaryData.Users = _context.Users.ToList();
                    summaryData.InternationShipData = _internationalShipService.GetInternationShipData();
                    break;
            }

            return Ok(summaryData);
        }

    }
}