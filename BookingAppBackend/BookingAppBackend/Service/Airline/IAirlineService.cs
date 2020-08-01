using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Airline
{
    public interface IAirlineService
    {
        Task<BookingAppBackend.Model.Airlines.Airline> GetAirline(int id);
        Task<AirlineDataResource> GetData(int airlineId);
        Task<AirlineAdminResponse> CheckAdmin(string username, int id);
        Task<IEnumerable<BookingAppBackend.Model.Airlines.Airline>> GetAirlines(AirlineSearchParameters param);
        Task<BookingAppBackend.Model.Airlines.Airline> EditAirlineAsync(AirlineParameter airline);
    }
}
