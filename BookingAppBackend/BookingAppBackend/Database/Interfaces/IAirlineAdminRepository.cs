﻿using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IAirlineAdminRepository
    {
        Task<AirlineAdmin> GetAirlineAdminAsync(string username);
        Task<AirlineAdminResponse> AddAirlineAdminAsync(AirlineAdmin admin);
        Task<AirlineAdminResponse> EditAirlineAdminAsync(UserEdit details, string username);
    }
}
