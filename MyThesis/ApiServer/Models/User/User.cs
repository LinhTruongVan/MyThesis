using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiServer.Models.User
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Phone { get; set; }
        public UserRole UserRole { get; set; }
        [ForeignKey("UserId")]
        public virtual ICollection<Ship.Ship> Ships { get; set; }
    }
}