using BookingAppBackend.Model.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class FlightResponse : Response<Flight>
    {
        public FlightResponse(Flight flight) : base(flight) { }

        public FlightResponse(string message) : base(message) { }
    }
}
