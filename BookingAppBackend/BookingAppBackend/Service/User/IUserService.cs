using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.User
{
    public interface IUserService
    {
        Task<IEnumerable<BookingAppBackend.Model.Users.User>> GetFriends(string username);
        Task<IEnumerable<BookingAppBackend.Model.Users.User>> GetPendingRequests(string username);
        Task<IEnumerable<BookingAppBackend.Model.Users.User>> Search(UserSearchParams param);
        Task<UserResponse> SendRequest(string username, string friendUsername);
        Task<UserResponse> AcceptRequest(string username, string friendUsername);
        Task<UserResponse> RejectRequest(string username, string friendUsername);
    }
}
