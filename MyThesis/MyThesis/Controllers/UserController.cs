using System.Linq;
using System.Web.Http;
using MyThesis.DAL;
using MyThesis.Models.User;

namespace MyThesis.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController: ApiController
    {
        private readonly ThesisContext _context = new ThesisContext();

        [Route("authenticate")]
        [HttpPost]
        public IHttpActionResult AuthenticateUser([FromBody] User userViewModel)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == userViewModel.UserName);
            if(user == null) return NotFound();
            if (user.Password != userViewModel.Password) return BadRequest();

            return Ok(user);
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult CreateUser([FromBody] User userViewModel)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == userViewModel.UserName);
            if (user != null) return BadRequest();

            userViewModel.UserRole = UserRole.User;;
            _context.Users.Add(userViewModel);
            _context.SaveChanges();

            return Ok(userViewModel);
        }

        [Route("{userId}")]
        [HttpDelete]
        public IHttpActionResult CreateUser(int userId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if (user == null) return BadRequest();

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok(user);
        }

    }
}