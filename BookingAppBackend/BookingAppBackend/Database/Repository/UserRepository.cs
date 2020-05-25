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
    public class UserRepository : Repository , IUserRepository
    {
        public UserRepository(BookingAppDbContext context) : base(context) { }

        public async Task<User> GetUserAsync(string username)
        {
            return await context.RegisteredUsers.FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
        }
    }
}
