using BookingAppBackend.Model.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class AirplaneUserResponse : Response<AirplaneUser>
    {
        public AirplaneUserResponse(AirplaneUser airplane) : base(airplane) { }

        public AirplaneUserResponse(string message) : base(message) { }
    }
}
