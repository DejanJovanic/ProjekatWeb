using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Users
{
    public class RentACarAdmin
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string City { get; set; }
        [Key]
        public string Username { get; set; }
        public int EnterpriseId { get; set; }
        public RentACarAdmin() { }
    }
}
