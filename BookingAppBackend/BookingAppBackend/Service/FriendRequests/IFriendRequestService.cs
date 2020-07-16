using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.FriendRequests
{
    public interface IFriendRequestService 
    {
        Task<IEnumerable<BookingAppBackend.Model.Users.User>> GetPendingRequests(string username);
        Task<UserResponse> SendRequest(string username, string friendUsername);
        Task<UserResponse> AcceptRequest(string username, string friendUsername);
        Task<UserResponse> RejectRequest(string username, string friendUsername);
    }
}
