using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Responses;
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
            if (string.IsNullOrWhiteSpace(username)) return null;
            return await context.RegisteredUsers.Include(i => i.CarReservations).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
        }

        public async Task<User> GetUserWithFastFlightsAsync(string username)
        {
            if (string.IsNullOrWhiteSpace(username)) return null;
            return await context.RegisteredUsers
                .Include(i => i.FastFlights).ThenInclude(i => i.Flight).ThenInclude(i => i.PaidExtras)
                .Include(i => i.FastFlights).ThenInclude(i => i.Airline).ThenInclude(i => i.Address)
                .Include(i => i.FastFlights).ThenInclude(i => i.PaidExtras).ThenInclude(i => i.PaidExtra)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
        }

        public async Task<IEnumerable<User>> GetFriends(string username)
        {
            var temp = await context.RegisteredUsers
                .Include(i => i.MyFriends)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if(temp != null)
            {
                var ret = new List<User>();
                foreach(var a in temp.MyFriends)
                {
                    var user = new User();
                    user.Username = a.FriendUsername;
                    user.Name = a.FriendName;
                    user.LastName = a.FriendLastName;
                    ret.Add(user);
                }
                return ret;
            }
            else
                return null;
        }

        public async Task<IEnumerable<User>> GetPendingRequests(string username)
        {
            var temp = await context.RegisteredUsers
                .Include(i => i.MyPendingRequests)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if (temp != null)
            {
                var ret = new List<User>();
                foreach (var a in temp.MyPendingRequests)
                {
                    var user = new User();
                    user.Username = a.RequestSenderUsername;
                    ret.Add(user);
                }
                return ret;
            }
            else
                return null;
        }
        public async Task<UserResponse> AcceptRequest(string username,string friendUsername)
        {
            var user = await context.RegisteredUsers
                .Include(i => i.MyFriends)
                .Include(i => i.MyPendingRequests)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if (user == null)
                return new UserResponse("User with username: " + username + " does not exist.");
            var friend = await context.RegisteredUsers
                .Include(i => i.MyFriends)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(friendUsername.ToLower()));
            if (friend == null)
                return new UserResponse("User with username: " + friendUsername + " hasn't sent friend request.");
            PendingRequest temp = null;
            foreach(var a in user.MyPendingRequests)
            {
                if(a.RequestSenderUsername.ToLower() == friendUsername.ToLower())
                {
                    var friend1 = new Friend();
                    var friend2 = new Friend();
                    friend1.FriendLastName = user.LastName;
                    friend1.FriendName = user.Name;
                    friend1.FriendUsername = user.Username;
                   
                    friend2.FriendUsername = friend.Username;
                    friend2.FriendName = friend.Name;
                    friend2.FriendLastName = friend.LastName;

                    user.MyFriends.Add(friend2);
                    friend.MyFriends.Add(friend1);

                    temp = a;
                    break;
                }
            }
            
            if(temp != null)
            {
                user.MyPendingRequests.Remove(temp);
                return new UserResponse(user);
            }
            else
                return new UserResponse("No friend request found.");
            
        }

        public async Task<UserResponse> DeleteFriend(string username, string friendUsername)
        {
            var user = await context.RegisteredUsers
      .Include(i => i.MyFriends)
      .Include(i => i.MyPendingRequests)
      .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if (user == null)
                return new UserResponse("User with username: " + username + " does not exist.");
            var friend = await context.RegisteredUsers
                .Include(i => i.MyFriends)
                .Include(i => i.MyPendingRequests)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(friendUsername.ToLower()));
            if (friend == null)
                return new UserResponse("User with username: " + friendUsername + " hasn't sent friend request.");
            Friend friendUser = null;
            Friend friendFriend = null;
            foreach (var a in user.MyFriends)
            {
                if (a.FriendUsername.ToLower() == friendUsername.ToLower())
                {
                    friendUser = a;
                    break;
                }
            }
            foreach (var a in friend.MyFriends)
            {
                if (a.FriendUsername.ToLower() == username.ToLower())
                {
                    friendFriend = a;
                    break;
                }
            }
            if (friendUser != null && friendFriend != null)
            {
                user.MyFriends.Remove(friendUser);
                friend.MyFriends.Remove(friendFriend);
                context.Friend.Remove(friendUser);
                context.Friend.Remove(friendFriend);
                return new UserResponse(user);
            }
            else
            {
                return new UserResponse("You are not friend with given user.");
            }

        }

        public async Task<UserResponse> SendRequest(string username, string friendUsername)
        {
            var user = await context.RegisteredUsers
                .Include(i => i.MyFriends)
                .Include(i => i.MyPendingRequests)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if (user == null)
                return new UserResponse("User with username: " + username + " does not exist.");
            var friend = await context.RegisteredUsers
                .Include(i => i.MyFriends)
                .Include(i => i.MyPendingRequests)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(friendUsername.ToLower()));
            if (friend == null)
                return new UserResponse("User with username: " + friendUsername + " hasn't sent friend request.");

            if(friend.MyPendingRequests.Count(i => i.RequestSenderUsername.ToLower() == username.ToLower() ) > 0)
                return new UserResponse("Friend request already sent.");
            foreach(var a in friend.MyFriends)
            {
                if(a.FriendUsername.ToLower() == username.ToLower())
                    return new UserResponse("Already friends.");
            }

            var req = new PendingRequest();
            req.RequestSenderUsername = username;
            friend.MyPendingRequests.Add(req);

            return new UserResponse(user);
        }

        public async Task<UserResponse> RejectRequest(string username, string friendUsername)
        {
            var user = await context.RegisteredUsers
                .Include(i => i.MyFriends)
                .Include(i => i.MyPendingRequests)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if (user == null)
                return new UserResponse("User with username: " + username + " does not exist.");
            var friend = await context.RegisteredUsers
                .Include(i => i.MyFriends)
                .Include(i => i.MyPendingRequests)
                .FirstOrDefaultAsync(i => i.Username.ToLower().Equals(friendUsername.ToLower()));
            if (friend == null)
                return new UserResponse("User with username: " + friendUsername + " hasn't sent friend request.");
            PendingRequest req = null;
            foreach(var a in user.MyPendingRequests)
            {
                if (a.RequestSenderUsername.ToLower() == friendUsername.ToLower())
                {
                    req = a;
                }
            }
            if(req != null)
            {
                user.MyPendingRequests.Remove(req);
                return new UserResponse(user);
            }
            else
            {
                return new UserResponse("No friend request found.");
            }           
        }

        public async Task<UserResponse> InsertUser(User user)
        {
            var temp = await context.RegisteredUsers.FindAsync(user.Username);
            if (temp == null)
            {
                context.RegisteredUsers.Add(user);
                return new UserResponse(user);
            }
            else
                return new UserResponse("User with given username already exists.");
        }

        public async Task<UserResponse> EditUser(UserEdit details, string username)
        {

            var temp = await context.RegisteredUsers.FindAsync(username);
            if (temp != null)
            {
                temp.City = details.City;
                temp.Name = details.Name;
                temp.LastName = details.LastName;
                temp.PhoneNumber = details.PhoneNumber;
                return new UserResponse(temp);
            }
            else
                return new UserResponse("Admin with given username does not exist.");
        }


        public async Task<UserResponse> EnableUser(string username)
        {
            var temp = await context.RegisteredUsers.FindAsync(username);
            if (temp != null)
            {
                temp.IsEnabled = true;
                return new UserResponse(temp);
            }
            else
                return new UserResponse("User with given username does not exist.");
        }
        private bool CheckIfOk(User user,UserSearchParams param)
        {
            bool isOk = true;
            if (param.Username != null && param.Username != "")
                if (!user.Username.ToLower().Equals(param.Username.ToLower()))
                    isOk = false;
            if (param.Name != null && param.Name != "")
                if (!param.Name.ToLower().Equals(user.Name.ToLower()))
                    isOk = false;
            if (param.LastName != null && param.LastName != "")
                if (!user.LastName.ToLower().Equals(param.LastName.ToLower()))
                    isOk = false;

            return isOk;
        }
        public async Task<IEnumerable<User>> Search(UserSearchParams param)
        {
            var temp = await context.RegisteredUsers.ToListAsync();
            return temp.Where(i => CheckIfOk(i,param));

        }

        public async Task<UserResponse> AddReservation(string username,Reservation reservation)
        {
            var temp = await context.RegisteredUsers.Include(i => i.MyReservations).FirstOrDefaultAsync(i => i.Username.ToLower() == username.ToLower());
            if (temp != null)
            {
                try
                {
                    var ur = new UserReservation { User = temp, Reservation = reservation };
                    temp.MyReservations.Add(ur);
                    reservation.Users.Add(ur);
                    return new UserResponse(temp);
                }
                catch(Exception e)
                {
                    return new UserResponse(e.InnerException.Message);
                }
       
            }
            else
                return new UserResponse("User with given username does not exist");
        }

    }
}
