using BookingAppBackend.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.AirlineAdmin
{
    public class AirlineAdminService : IAirlineAdminService
    {
        IAirlineAdminRepository repo;

        public AirlineAdminService(IAirlineAdminRepository repo)
        {
            this.repo = repo;
        }

        public async Task<BookingAppBackend.Model.Users.AirlineAdmin> GetAdminAsync(string username)
        {
            return await repo.GetAirlineAdminAsync(username);
        }
    }
}
