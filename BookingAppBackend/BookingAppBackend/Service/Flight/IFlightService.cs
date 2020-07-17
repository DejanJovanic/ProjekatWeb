using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Flight
{
    public interface IFlightService
    {
        Task<FlightDetailsResponse> GetDetails(int flightId);
        Task<FlightResponse> AddFlight(FlightAddParameter flight, int airlineId);
    }
}
