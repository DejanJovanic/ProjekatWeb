using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.FastFlightReservation
{
    public interface IFastFlightReservationService
    {
        Task<FastFlightResponse> Set(int airlineId, int fastFlightId, string username, ICollection<int> paidExtras, double loadWeight, string passportNum);
        Task<IEnumerable<Model.Airlines.FastFlight>> Get(string username);
        Task<FastFlightResponse> Cancel(int airlineId, int fastFlightId, string username);
    }
}
