using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Parameters
{
    public class TicketParameter
    {
        public int Row { get; set; }
        public int Column { get; set; }
        public double Price { get; set; }
        public int AirlineId { get; set; }
        public int FlightId { get; set; }
        public string TicketOwnerUsername { get; set; }
        public ICollection<int> SelectedExtras { get; set; } = new List<int>();
        public double LoadWeight { get; set; }
        public string InvitedByUsername { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Passport { get; set; }
    }
}
