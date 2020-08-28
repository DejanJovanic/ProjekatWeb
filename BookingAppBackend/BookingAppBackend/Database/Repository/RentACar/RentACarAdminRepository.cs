﻿using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces.RentACar;
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
    }
}
