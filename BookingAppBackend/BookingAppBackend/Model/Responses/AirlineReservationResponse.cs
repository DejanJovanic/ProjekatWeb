using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class AirlineReservationResponse : Response<Reservation>
    {
        public AirlineReservationResponse(Reservation reservation) : base(reservation) { }

        public AirlineReservationResponse(string message) : base(message) { }
    }
}
