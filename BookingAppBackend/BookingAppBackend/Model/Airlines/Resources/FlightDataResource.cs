using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Resources
{
    public class FlightDataResource
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartDateBack { get; set; }
        public DateTime EndDateBack { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public bool IsRoundTrip { get; set; }

        public ICollection<RatingResource> FlightRatings { get; set; } = new List<RatingResource>();
        public ICollection<TicketDataResource> Tickets { get; set; } = new List<TicketDataResource>();
    }
}
