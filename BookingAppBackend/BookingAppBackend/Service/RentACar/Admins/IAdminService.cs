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
    }
}
