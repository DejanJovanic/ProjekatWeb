using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.User
{
    public interface IUserService
    {
        Task<IEnumerable<BookingAppBackend.Model.Users.User>> Search(UserSearchParams param);
        Task<UserResponse> Add(UserAdd data, IUrlHelper urlHelper);
        Task<UserResponse> EnableUser(string username);
        Task<UserResponse> Edit(UserEdit details, string username);
    }
}
