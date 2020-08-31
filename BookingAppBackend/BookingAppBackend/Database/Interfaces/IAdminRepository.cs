using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IAdminRepository
    {
        Task<Admin> GetAdminAsync(string username);
        Task<Admin> AddAdmin(Admin admin);
    }
}
