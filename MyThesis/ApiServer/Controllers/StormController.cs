using System;
using System.Linq;
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

        [Route("")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(_context.Storms.ToList());
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("{stormId}")]
        [HttpPut]
        public IHttpActionResult Put(int stormId, [FromBody] Storm newStorm)
        {
            try
            {
                var storm = _context.Storms.FirstOrDefault(s => s.Id == stormId);

                if(storm == null) return NotFound();

                storm.Name = newStorm.Name;
                storm.Latitude = newStorm.Latitude;
                storm.Longitude = newStorm.Longitude;
                storm.Radius = newStorm.Radius;
                storm.Description = newStorm.Description;

                _context.SaveChanges();

                return Ok(storm);

            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [Route("{stormId}")]
        [HttpDelete]
        public IHttpActionResult Delete(int stormId)
        {
            try
            {
                var storm = _context.Storms.FirstOrDefault(s => s.Id == stormId);

                if (storm == null) return NotFound();

                _context.Storms.Remove(storm);
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