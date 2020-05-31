using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class FlightAddSeats
    {
        [Required]
        public int RowsTop { get; set; }
        [Required]
        public int RowsBottom { get; set; }
        [Required]
        public int ColumnsLeft { get; set; }
        [Required]
        public int ColumnsRight { get; set; }
        [Required]
        public int FlightId { get; set; }
    }
}
