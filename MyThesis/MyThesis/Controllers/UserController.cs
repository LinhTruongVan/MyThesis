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

    }
}