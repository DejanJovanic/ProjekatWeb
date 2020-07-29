using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IFastFlightRepository
    {
        Task<FastFlightResponse> Add(int airlineId, int flightId, int row, int column, double discountPercentage);
        Task<IEnumerable<FastFlight>> Get(int airlineId);
        Task<FastFlight> Get(int airlineId, int fastFlightId);
        Task<IEnumerable<FastFlight>> Get(string username);
        Task<FastFlightResponse> Set(int airlineId, int fastFlightId, string username, ICollection<int> paidExtras, double loadWeight, string passportNum);
        Task<FastFlightResponse> Cancel(int airlineId, int fastFlightId, string username);
        
    }
}
