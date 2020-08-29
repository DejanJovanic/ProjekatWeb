using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.Users;
using Microsoft.AspNetCore.Identity;
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
        private UserManager<AuthentificationUser> manager;


        public AdminService(IRentACarAdminRepository repo, IUnitOfWork unitOfWork)
        {

            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }
        public async Task<RentACarAdmin> GetRentACarAdminAsync(string username)
        {
            return await repo.GetRentACarAdminAsync(username);
        }

        /*public async Task<AirlineAdminResponse> Add(AirlineAdminAdd admin)
         {
             var newAdmin = new BookingAppBackend.Model.Users.RentACarAdmin();
             var user = new AuthentificationUser();
             user.UserName = admin.Username;
             newAdmin.Username = admin.Username;
             user.Email = admin.Email;
             newAdmin.Name = admin.Name;
             newAdmin.LastName = admin.LastName;
             newAdmin.PhoneNumber = admin.PhoneNumber;
             newAdmin.City = admin.City;
             newAdmin.EntrepriseId = admin.EntrepriseId;
             if (await manager.FindByNameAsync(admin.Username) == null)
             {

                 var ok = await manager.CreateAsync(user, admin.Password);
                 if (ok.Succeeded)
                 {
                     ok = await manager.AddToRoleAsync(user, "RentACarAdmin");
                     if (ok.Succeeded)
                     {
                         var temp = await repo.AddAirlineAdminAsync(newAdmin);
                         if (temp.Success)
                             await unitOfWork.CompleteAsync();

                         return temp;

                     }
                     else
                         return new AirlineAdminResponse(ok.Errors.First().Description);
                 }
                 else
                     return new AirlineAdminResponse(ok.Errors.First().Description);
             }
             else
                 return new AirlineAdminResponse("User with given username already exists");
         }
     }*/
    }
}
 