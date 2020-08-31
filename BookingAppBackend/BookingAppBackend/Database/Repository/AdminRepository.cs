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
    public class AdminRepository : Repository, IAdminRepository
    {
        public AdminRepository(BookingAppDbContext context) : base(context) { }
        public async Task<Admin> AddAdmin(Admin admin)
        {
            var temp = await context.Admins.FindAsync(admin.Username);
            if (temp == null)
            {
                context.Admins.Add(admin);
                return admin;
            }
            else
                return null;
        }

        public async Task<Admin> GetAdminAsync(string username)
        {
            return await context.Admins.FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
        }
    }
}
