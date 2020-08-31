using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Resources
{
    public class AirlineResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AirlineAddress Address { get; set; }
        public string Description { get; set; }
        public double Rating { get; set; }
        public IEnumerable<string> Destinations { get; set; }
        public IEnumerable<Airplane> Airplanes { get; set; }
        public IEnumerable<Flight> Flights { get; set; }
    }
}
