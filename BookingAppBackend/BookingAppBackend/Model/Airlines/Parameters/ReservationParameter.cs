using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class ReservationParameter
    {
       public ICollection<TicketParameter> Tickets { get; set; }
    }
}
