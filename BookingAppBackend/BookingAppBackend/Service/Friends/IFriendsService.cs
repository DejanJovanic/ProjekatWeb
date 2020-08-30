using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Friends
{
    public interface IFriendsService
    {
        Task<IEnumerable<BookingAppBackend.Model.Users.User>> GetFriends(string username);
        Task<UserResponse> DeleteFriend(string username, string friendUsername);
    }
}
