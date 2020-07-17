using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class TicketPaidExtra
    {
        public int TicketId { get; set; }
        public int PaidExtraId { get; set; }
        public virtual Ticket Ticket { get; set; }
        public virtual PaidExtras PaidExtra { get; set; }
    }
}
