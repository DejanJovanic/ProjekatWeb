using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Users
{
    public class RentACarAdmin
    {
        [Key]
        public string Username { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
       
        public int EnterpriseId { get; set; }
        public RentACarAdmin() { }
    }
}
