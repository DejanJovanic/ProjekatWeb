using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Users
{
    public class AirlineAdminResource
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string AirlineID { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
    }
}
