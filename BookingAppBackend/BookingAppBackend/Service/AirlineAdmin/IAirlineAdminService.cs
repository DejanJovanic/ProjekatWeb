using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.AirlineAdmin
{
    public interface IAirlineAdminService
    {
        Task<BookingAppBackend.Model.Users.AirlineAdmin> GetAdminAsync(string username);
    }
}
