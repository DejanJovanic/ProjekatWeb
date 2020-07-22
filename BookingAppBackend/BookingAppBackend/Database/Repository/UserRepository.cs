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
            return await context.RegisteredUsers.FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
        }

        public async Task<IEnumerable<User>> GetFriends(string username)
        {
          var temp = await context.RegisteredUsers.Include(i => i.Friends).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
          return temp.Friends;
        }

        public async Task<IEnumerable<User>> GetPendingRequests(string username)
        {
            var temp = await context.RegisteredUsers.Include(i => i.PendingRequests).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            return temp.PendingRequests;
        }
        public async Task<UserResponse> AcceptRequest(string username,string friendUsername)
        {
            var user = await context.RegisteredUsers.Include(i => i.Friends).Include(i => i.PendingRequests).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if (user == null)
                return new UserResponse("User with username: " + username + " does not exist.");
            var friend = await context.RegisteredUsers.Include(i => i.Friends).Include(i => i.PendingRequests).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(friendUsername.ToLower()));
            if (friend == null)
                return new UserResponse("User with username: " + friendUsername + " hasn't sent friend request.");
            if(!user.PendingRequests.Contains(friend))
                return new UserResponse("No friend request found.");
            user.PendingRequests.Remove(friend);
            user.Friends.Add(friend);
            friend.Friends.Add(user);
            
            return new UserResponse(user);
        }

        public async Task<UserResponse> SendRequest(string username, string friendUsername)
        {
            var user = await context.RegisteredUsers.FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if (user == null)
                return new UserResponse("User with username: " + username + " does not exist.");
            var friend = await context.RegisteredUsers.Include(i => i.Friends).Include(i => i.PendingRequests).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(friendUsername.ToLower()));
            if (friend == null)
                return new UserResponse("User with username: " + friendUsername + " hasn't sent friend request.");

            if(friend.PendingRequests.Contains(user))
                return new UserResponse("Friend request already sent.");
            if (friend.Friends.Contains(user))
                return new UserResponse("Already friends.");
            
            friend.PendingRequests.Add(user);

            return new UserResponse(user);
        }

        public async Task<UserResponse> RejectRequest(string username, string friendUsername)
        {
            var user = await context.RegisteredUsers.Include(i => i.Friends).Include(i => i.PendingRequests).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
            if (user == null)
                return new UserResponse("User with username: " + username + " does not exist.");
            var friend = await context.RegisteredUsers.Include(i => i.Friends).Include(i => i.PendingRequests).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(friendUsername.ToLower()));
            if (friend == null)
                return new UserResponse("User with username: " + friendUsername + " hasn't sent friend request.");
            if (!user.PendingRequests.Contains(friend))
                return new UserResponse("No friend request found.");
            user.PendingRequests.Remove(friend);

            return new UserResponse(user);
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
