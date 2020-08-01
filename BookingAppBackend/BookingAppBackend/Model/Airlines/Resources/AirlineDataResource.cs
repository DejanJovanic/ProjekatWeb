using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Resources
{
    public class AirlineDataResource
    {
        public ICollection<RatingResource> AirlineRatings { get; set; } = new List<RatingResource>();
        public ICollection<FlightDataResource> Flights { get; set; } = new List<FlightDataResource>();
    }
}
