using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Model.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository.RentACar
{
    public class RentACarAdminRepository : Repository, IRentACarAdminRepository
    {
        public RentACarAdminRepository(BookingAppDbContext context) : base(context) { }
        public async Task<RentACarAdmin> GetRentACarAdminAsync(string username)
        {
            return await context.RentACarAdmins.FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
        }

        public async Task<RentACarAdmin> AddRentACarAdmin(RentACarAdmin admin)
        {
            var temp = await context.RentACarAdmins.FindAsync(admin.Username);
            if (temp == null)
            {
                context.RentACarAdmins.Add(admin);
                return admin;
            }
            else
                return null;
        }

        public async Task<RentACarAdmin> EditProfile(RentACarAdminEditProfile parameters)
        {

            var temp = await context.RentACarAdmins.FindAsync(parameters.Username);
            if (temp != null)
            {
                temp.City = parameters.City;
                temp.Name = parameters.FirstName;
                temp.LastName = parameters.LastName;
                temp.PhoneNumber = parameters.PhoneNumber;
                return temp;
            }
            else
                return null;
        }

        public async Task<DiscountBasedOnPoints> AddDiscountBasedOnPoints(DiscountBasedOnPoints parameters)
        {
            var temp = new DiscountBasedOnPoints();
            temp.Discount = parameters.Discount;

            context.DiscountsBasedOnPoints.Add(temp);

            return temp;
        }
    }
}
