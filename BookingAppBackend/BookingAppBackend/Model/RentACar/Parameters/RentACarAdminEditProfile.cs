using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.RentACar.Parameters
{
    public class RentACarAdminEditProfile
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string City { get; set; }
        [Required]

        public string PhoneNumber { get; set; }

        [Required]
        public string LastName { get; set; }

    }
}
