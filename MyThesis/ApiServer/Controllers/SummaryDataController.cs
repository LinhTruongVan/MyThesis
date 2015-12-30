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
        private readonly SummaryDataService _summaryDataService = new SummaryDataService();

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
                Storms = _context.Storms.ToList(),
                WarningMessages = new List<string>()
            };

            var ships = _context.Ships.Include(s => s.ShipLocations).ToList();

            var shipIdHasCollisionWithInternationalShip = new List<int>();
            var shipIdHasCollisionWithStorm = new List<int>();
            var shipIdInDanger = new List<int>();
            foreach (var ship in ships)
            {
                var latestShipLocation = ship.ShipLocations.LastOrDefault();
                if(latestShipLocation == null) continue;

                foreach (var internationalShipLocation in summaryData.InternationShipData.Data)
                {
                    if (_summaryDataService.IsInDanger(latestShipLocation.Latitude, latestShipLocation.Longitude,
                        internationalShipLocation[0], internationalShipLocation[1], 10))
                    {
                        shipIdHasCollisionWithInternationalShip.Add(ship.Id);
                        break;
                    }
                }

                foreach (var stormLocation in summaryData.Storms)
                {
                    if (_summaryDataService.IsInDanger(latestShipLocation.Latitude, latestShipLocation.Longitude,
                        stormLocation.Latitude, stormLocation.Longitude, 20 + stormLocation.Radius/1000))
                    {
                        shipIdHasCollisionWithStorm.Add(ship.Id);
                        break;
                    }
                }

                if(latestShipLocation.ShipStatus != ShipStatus.Normal) shipIdInDanger.Add(ship.Id);
            }

            if (shipIdHasCollisionWithStorm.Count > 0)
            {
                summaryData.WarningMessages.Add("Tàu(" + string.Join(",", shipIdHasCollisionWithStorm) + ") đang nằm trong khu vực nguy hiểm với bão lớn. Hãy cẩn thận!");
            }

            if (shipIdHasCollisionWithInternationalShip.Count > 0)
            {
                summaryData.WarningMessages.Add("Tàu(" + string.Join(",", shipIdHasCollisionWithInternationalShip) + ") đang hoạt động gần tàu quốc tế. Hãy cẩn thận để tránh va chạm!");
            }

            if (shipIdInDanger.Count > 0)
            {
                summaryData.WarningMessages.Add("Tàu(" + string.Join(",", shipIdInDanger) + ") đang gặp sự cố trên biển, cần sự giúp đỡ!");
            }

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