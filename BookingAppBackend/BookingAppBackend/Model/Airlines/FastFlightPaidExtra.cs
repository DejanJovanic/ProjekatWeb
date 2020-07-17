using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class FastFlightPaidExtra
    {
        public int FastFlightId { get; set; }
        public int PaidExtraId { get; set; }
        public virtual FastFlight FastFlight { get; set; }
        public virtual PaidExtras PaidExtra { get; set; }
    }
}
