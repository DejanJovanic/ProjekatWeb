using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserAsync(string username);
        Task<IEnumerable<User>> GetFriends(string username);
        Task<IEnumerable<User>> GetPendingRequests(string username);
        Task<UserResponse> SendRequest(string username, string friendUsername);
        Task<UserResponse> AcceptRequest(string username, string friendUsername);
        Task<UserResponse> RejectRequest(string username, string friendUsername);
        Task<UserResponse> InsertUser(User user);
        Task<UserResponse> EnableUser(string username);
        Task<IEnumerable<User>> Search(UserSearchParams param);
    }
}
