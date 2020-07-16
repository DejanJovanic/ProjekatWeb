using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Users
{
    public class AirlineAdmin
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public int AirlineID { get; set; }

        public AirlineAdmin() { }
    }
}
