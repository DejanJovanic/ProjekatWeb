using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class FastFlightReservationParameter
    {
        [Required]
        public int AirlineId { get; set; }
        [Required]
        public int FastFlightId { get; set; }
        [Required]
        public string Username { get; set; }
        public ICollection<int> PaidExtras { get; set; }
        [Required]
        public double LoadWeight { get; set; }
        [Required]
        public string PassportNumber { get; set; }
    }
}
