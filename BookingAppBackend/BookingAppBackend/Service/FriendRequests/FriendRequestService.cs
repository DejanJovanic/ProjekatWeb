using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.FriendRequests
{
    public class FriendRequestService : IFriendRequestService
    {
        IUserRepository repo;
        IUnitOfWork unitOfWork;

        public FriendRequestService(IUserRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<BookingAppBackend.Model.Users.User>> GetPendingRequests(string username)
        {
            return await repo.GetPendingRequests(username);
        }

        public async Task<UserResponse> SendRequest(string username, string friendUsername)
        {
            var ret = await repo.SendRequest(username, friendUsername);
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
