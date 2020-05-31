using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IFlightRepository
    {
        Task<FlightResponse> AddFlight(FlightAddParameter flight, int airlineId);
        Task<FlightResponse> AddSeats(int rowsTop, int rowsBottom, int columnsLeft, int columnsRight, int airlineId, int flightId);
        Task<FlightResponse> DisableSeat(int row, int column, int airlineId, int flightId);
        Task<FlightResponse> RemoveSeat(int row, int column, int airlineId, int flightId);
    }
}
