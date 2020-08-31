using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces.RentACar
{
    public interface IRentACarAdminRepository
    {
        Task<RentACarAdmin> GetRentACarAdminAsync(string username);
        Task<RentACarAdmin> AddRentACarAdmin(RentACarAdmin admin);
        Task<RentACarAdmin> EditProfile(RentACarAdminEditProfile parameters);

    }
}
