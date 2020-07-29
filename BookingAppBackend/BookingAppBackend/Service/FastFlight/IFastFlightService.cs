using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.FastFlight
{
    public interface IFastFlightService
    {
        Task<FastFlightResponse> Add(int airlineId, int flightId, int row, int column, double discountPercentage);
        Task<IEnumerable<Model.Airlines.FastFlight>> Get(int airlineId);
    }
}
