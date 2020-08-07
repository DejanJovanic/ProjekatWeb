using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class ReservationOptionsParameter
    {
        [Required]
        public int AirlineId { get; set; }
        [Required]
        public int FlightId { get; set; }
        [Required]
        public int TicketId { get; set; }
        public string PassportNumber { get; set; }
        public double LuggageWeight { get; set; }
        public ICollection<int> SelectedExtras { get; set; }
        public bool InvestingPoints { get; set; }
    }
}
