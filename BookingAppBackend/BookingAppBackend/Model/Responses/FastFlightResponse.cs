using BookingAppBackend.Model.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class FastFlightResponse : Response<FastFlight>
    {
        public FastFlightResponse(FastFlight fastFlight) : base(fastFlight) { }

        public FastFlightResponse(string errorMessage) : base(errorMessage) { }
    }
}
