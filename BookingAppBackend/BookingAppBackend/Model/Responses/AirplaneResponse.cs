using BookingAppBackend.Model.Airlines;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class AirplaneResponse : Response<Airplane>
    {
        public AirplaneResponse(Airplane airplane) : base(airplane) { }

        public AirplaneResponse(string message) : base(message) { }
    }
}
