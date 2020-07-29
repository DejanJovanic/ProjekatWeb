using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines.Resources
{
    public class FastFlightResource
    {
        public int Id { get; set; }
        public AirlineResource Airline { get; set; }
        public FlightResource Flight { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public UserResource User { get; set; }
        public double DiscountPercentage { get; set; }
        public DateTime BookingDate { get; set; }
        public ICollection<PaidExtras> PaidExtras { get; set; } = new List<PaidExtras>();
        public double LoadWeight { get; set; }
        public bool IsRated { get; set; }
        public double Price { get; set; }
    }
}
