using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class FlightSeatChange
    {
        [Required]
        public int FlightId { get; set; }
        [Required]
        public int Column { get; set; }
        [Required]
        public int Row { get; set; }
    }
}
