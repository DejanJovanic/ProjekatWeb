using BookingAppBackend.Model.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class FlightDetailsResponse : Response<FlightDetails>
    {
        public FlightDetailsResponse(FlightDetails details) : base(details) { }
        public FlightDetailsResponse(string message) : base(message) { }
    }
}
