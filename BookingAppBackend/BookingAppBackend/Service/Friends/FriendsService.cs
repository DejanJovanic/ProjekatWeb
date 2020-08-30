using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Friends
{
    public class FriendsService : IFriendsService
    {
        IUserRepository repo;
        IUnitOfWork unitOfWork;

        public FriendsService(IUserRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<BookingAppBackend.Model.Users.User>> GetFriends(string username)
        {
            return await repo.GetFriends(username);
        }
        public async Task<UserResponse> DeleteFriend(string username, string friendUsername)
        {
            var ret = await repo.DeleteFriend(username, friendUsername);
            if (ret.Success)
                await this.unitOfWork.CompleteAsync();
            return ret;
        }


    }
}
