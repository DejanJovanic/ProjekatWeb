using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class AirplaneUser
    {
        public int FlightId { get; set; }
        public int Rows { get; set; }
        public int Columns { get; set; }
        public ICollection<Seat> DisabledSeats { get; set; } = new List<Seat>();
        public ICollection<Seat> RemovedSeats { get; set; } = new List<Seat>();
        public ICollection<Seat> TakenSeats { get; set; } = new List<Seat>();
        public ICollection<Seat> SpecialSeats { get; set; } = new List<Seat>();
    }
}
