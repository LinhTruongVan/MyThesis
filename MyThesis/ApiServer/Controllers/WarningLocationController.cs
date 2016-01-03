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
                if (warningLocation.UserId == null || warningLocation.UserId == 0)
                {
                    warningLocation.UserId = 1;
                }
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

        [Route("{warningId}")]
        [HttpDelete]
        public IHttpActionResult Delete(int warningId)
        {
            try
            {
                var warning = _context.WarningLocations.FirstOrDefault(w => w.Id == warningId);
                if (warning == null) return NotFound();

                _context.WarningLocations.Remove(warning);
                _context.SaveChanges();

                return Ok(warning);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("{warningId}")]
        [HttpPut]
        public IHttpActionResult Update(int warningId, [FromBody] WarningLocation updatedWarning)
        {
            try
            {
                var warning = _context.WarningLocations.FirstOrDefault(w => w.Id == warningId);
                if (warning == null) return NotFound();

                warning.Latitude = updatedWarning.Latitude;
                warning.Longitude = updatedWarning.Longitude;
                warning.WarningLocationType = updatedWarning.WarningLocationType;
                warning.Description = updatedWarning.Description;

                _context.SaveChanges();

                return Ok(warning);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

    }

}