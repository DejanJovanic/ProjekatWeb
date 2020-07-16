using BookingAppBackend.Model.Airlines.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Resources
{
    public class AirlineReservationResource
    {
        public ICollection<TicketParameter> Tickets { get; set; }
    }
}
