using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.Admins
{
    public interface IAdminService
    {
        Task<RentACarAdmin> GetRentACarAdminAsync(string username);
        Task<RentACarAdmin> AddRentACarAdmin(RentACarAdminAddParameters admin);
        Task<RentACarAdmin> EditProfile(RentACarAdminEditProfile parameters);
        Task<DiscountBasedOnPoints> AddDiscountBasedOnPoints(DiscountBasedOnPoints parameters);
        Task<Admin> AddGeneralAdmin(AdminAddParameters parameters);
    }
}
