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
        Task<FlightResponse> AddFlight(FlightAddParameter flight, int airlineId);
        Task<FlightResponse> RemoveSeat(int row, int column, int airlineId, int flightId);
        Task<FlightResponse> DisableSeat(int row, int column, int airlineId, int flightId);
        Task<FlightResponse> AddSeats(int rowsTop, int rowsBottom, int columnsLeft, int columnsRight, int airlineId, int flightId);
    }
}
