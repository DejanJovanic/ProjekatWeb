using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.Admins
{
    public class AdminService : IAdminService
    {
       
        private IRentACarAdminRepository repo;
        private IUnitOfWork unitOfWork;

        public AdminService(IRentACarAdminRepository repo, IUnitOfWork unitOfWork)
        {
          
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }
        public async Task<RentACarAdmin> GetRentACarAdminAsync(string username)
        {
            return await repo.GetRentACarAdminAsync(username);
        }
    }
}
