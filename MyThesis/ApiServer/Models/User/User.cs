using System.Collections.Generic;

namespace ApiServer.Models.User
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public UserRole UserRole { get; set; }
        public virtual ICollection<Ship.Ship> Ships { get; set; }
    }
}