using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.GeneralUser
{
    public interface IGeneralUserService
    {
        public Task<GeneralUserResponse> GetUserAsync(string username);
    }
}
