using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using Microsoft.AspNetCore.Identity;
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

        public async Task<AirlineAdminResponse> AddAirlineAdminAsync(AirlineAdmin admin)
        {

            var temp = await context.AirlineAdmins.FindAsync(admin.Username);
            if (temp == null)
            {
                context.AirlineAdmins.Add(admin);
                return new AirlineAdminResponse(admin);
            }
            else
                return new AirlineAdminResponse("Admin with given username already exists.");
        }

        public async Task<AirlineAdminResponse> EditAirlineAdminAsync(UserEdit details,string username)
        {

            var temp = await context.AirlineAdmins.FindAsync(username);
            if (temp != null)
            {
                temp.City = details.City;
                temp.Name = details.Name;
                temp.LastName = details.LastName;
                temp.PhoneNumber = details.PhoneNumber;
                return new AirlineAdminResponse(temp);
            }
            else
                return new AirlineAdminResponse("Admin with given username does not exist.");
        }
    }
}
