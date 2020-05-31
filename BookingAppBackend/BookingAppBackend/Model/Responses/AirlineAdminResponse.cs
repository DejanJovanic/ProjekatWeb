using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class AirlineAdminResponse : Response<AirlineAdmin>
    {
        public AirlineAdminResponse(AirlineAdmin airlineAdmin) : base(airlineAdmin) { }

        public AirlineAdminResponse(string errorMessage) : base(errorMessage) { }
    }
}
