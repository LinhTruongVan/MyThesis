using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiServer.Models.Ship
{
    public class InternationalShip
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}