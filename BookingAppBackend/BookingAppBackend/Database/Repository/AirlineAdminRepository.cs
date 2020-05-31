using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository
{
    public class AirlineAdminRepository : Repository , IAirlineAdminRepository
    {
        public AirlineAdminRepository(BookingAppDbContext context) : base(context) { }


        public async Task<AirlineAdmin> GetAirlineAdminAsync(string username)
        {
            return await context.AirlineAdmins.FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
        }
    }
}
