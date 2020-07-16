using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IAirlineRepository
    {
        IEnumerable<Airline> GetAirlines();
        Task<Airline> GetAirline(int id);
        Task<Airline> GetAirlineWithFlight(int flightId);
        Task<Airline> EditAirline(AirlineParameter airline);
    }
}
