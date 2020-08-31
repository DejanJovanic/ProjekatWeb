using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class UserRate
    {
        [Required]
        public int AirlineId { get; set; }
        [Required]
        public int TicketId { get; set; }
        [Required]

        public double FlightRating { get; set; }
        [Required]
        public double AirlineRating { get; set; }
    }
}
