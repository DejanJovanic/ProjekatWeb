using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Resources
{
    public class FlightResource
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartDateBack { get; set; }
        public DateTime EndDateBack { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public double Distance { get; set; }
        public IEnumerable<string> StopsLocations { get; set; }
        public double Price { get; set; }
        public int AirplaneId { get; set; }
        public bool IsRoundTrip { get; set; }
        public FlightClass FlightClass { get; set; }
    }
}
