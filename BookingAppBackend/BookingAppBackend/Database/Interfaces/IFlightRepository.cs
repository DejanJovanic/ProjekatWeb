using BookingAppBackend.Model.Airlines;
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
        Task<Flight> GetFlightAsync(int flightId);
        Task<FlightResponse> GetFlightAsync(int flightId, int airlineId);
        Task<FlightResponse> AddFlight(FlightAddParameter flight, int airlineId);
        Task<FlightResponse> AddSeats(int rowsTop, int rowsBottom, int columnsLeft, int columnsRight, int airlineId, int flightId);
        Task<FlightResponse> DisableSeat(int row, int column, int airlineId, int flightId);
        Task<FlightResponse> EnableSeat(int row, int column, int airlineId, int flightId);
        Task<FlightResponse> RemoveSeat(int row, int column, int airlineId, int flightId);
        bool IsSeatTaken(int row, int column, Airline airline, Flight flight, bool checkRemoved, bool checkDisabled);
        bool IsSeatOkForChange(int row, int column, Airline airline, Flight flight, bool checkRemoved, bool checkDisabled);
        bool IsSeatRemovedOrChanged(int row, int column, Airline airline, Flight flight);
    }
}
