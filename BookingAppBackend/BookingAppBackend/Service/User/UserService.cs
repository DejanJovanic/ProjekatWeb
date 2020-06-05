using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.User
{
    public class UserService : IUserService
    {
        IUserRepository repo;
        IUnitOfWork unitOfWork;

        public UserService(IUserRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<BookingAppBackend.Model.Users.User>> GetFriends(string username)
        {
            return await repo.GetFriends(username);
        }

        public async Task<IEnumerable<BookingAppBackend.Model.Users.User>> GetPendingRequests(string username)
        {
            return await repo.GetPendingRequests(username);
        }
        public async Task<IEnumerable<BookingAppBackend.Model.Users.User>> Search(UserSearchParams param)
        {
            return await repo.Search(param);
        }
        public async Task<UserResponse> SendRequest(string username, string friendUsername)
        {
            var ret =  await repo.SendRequest(username, friendUsername);
            if (ret.Success)
            {
                await unitOfWork.CompleteAsync();
            }
            return ret;
         
        }
        public async Task<UserResponse> AcceptRequest(string username, string friendUsername)
        {
            var ret = await repo.AcceptRequest(username, friendUsername);
            if (ret.Success)
            {
                await unitOfWork.CompleteAsync();
            }
            return ret;
        }
        public async Task<UserResponse> RejectRequest(string username, string friendUsername)
        {
            var ret = await repo.RejectRequest(username, friendUsername);
            if (ret.Success)
            {
                await unitOfWork.CompleteAsync();
            }
            return ret;
        }
    }
}
