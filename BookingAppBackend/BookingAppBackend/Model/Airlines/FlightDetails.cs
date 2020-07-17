using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class FlightDetails
    {
        public AirplaneUser Airplane { get; set; }
        public ICollection<PaidExtras> Extras { get; set; }
        public ICollection<WeightPricing> LuggageOptions { get; set; }
        public double Price { get; set; }
    }
}
