﻿using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.AirlineAdmin
{
    public interface IAirlineAdminService
    {
        Task<BookingAppBackend.Model.Users.AirlineAdmin> GetAdminAsync(string username);
        Task<AirlineAdminResponse> Add(AirlineAdminAdd admin);
    }
}
