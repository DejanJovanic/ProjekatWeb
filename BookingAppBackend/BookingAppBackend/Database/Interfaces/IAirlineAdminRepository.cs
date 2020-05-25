using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IAirlineAdminRepository
    {
        Task<AirlineAdmin> GetAirlineAdminAsync(string username);
    }
}
