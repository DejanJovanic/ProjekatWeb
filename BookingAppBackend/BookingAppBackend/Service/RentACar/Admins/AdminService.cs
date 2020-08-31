using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
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
        private IAdminRepository repo2;
        private IRentACarAdminRepository repo;
        private IUnitOfWork unitOfWork;
        private UserManager<AuthentificationUser> manager;


        public AdminService(IAdminRepository adminrepo, IRentACarAdminRepository repo, IUnitOfWork unitOfWork, UserManager<AuthentificationUser> manager)
        {
            this.manager = manager;
            this.repo = repo;
            this.unitOfWork = unitOfWork;
            this.repo2 = adminrepo;
        }
        public async Task<RentACarAdmin> GetRentACarAdminAsync(string username)
        {
            return await repo.GetRentACarAdminAsync(username);
        }
        public async Task<Admin> AddGeneralAdmin(AdminAddParameters parameters)
        {
            var newAdmin = new BookingAppBackend.Model.Users.Admin();
            var user = new AuthentificationUser();
            user.UserName = parameters.Username;
            newAdmin.Username = parameters.Username;
            user.Email = parameters.Email;
            newAdmin.Name = parameters.Name;
            newAdmin.LastName = parameters.LastName;
            newAdmin.PhoneNumber = parameters.PhoneNumber;
            newAdmin.City = parameters.City;
           
            if (await manager.FindByNameAsync(parameters.Username) == null)
            {

                var ok = await manager.CreateAsync(user, parameters.Password);
                if (ok.Succeeded)
                {
                    ok = await manager.AddToRoleAsync(user, "Admin");
                    if (ok.Succeeded)
                    {
                        var temp = await repo2.AddAdmin(newAdmin);
                        if (temp != null)
                            await unitOfWork.CompleteAsync();

                        return temp;

                    }
                    else
                        return null;
                }
                else
                    return null;
            }
            else
                return null;
        }
        public async Task<RentACarAdmin> AddRentACarAdmin(RentACarAdminAddParameters admin)
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
             newAdmin.EnterpriseId = admin.EnterpriseId;
             if (await manager.FindByNameAsync(admin.Username) == null)
             {
        
                 var ok = await manager.CreateAsync(user, admin.Password);
                 if (ok.Succeeded)
                 {
                     ok = await manager.AddToRoleAsync(user, "RentACarAdmin");
                     if (ok.Succeeded)
                     {
                         var temp = await repo.AddRentACarAdmin(newAdmin);
                         if (temp != null)
                             await unitOfWork.CompleteAsync();

                         return temp;

                     }
                     else
                         return null;
                 }
                 else
                     return null;
             }
             else
                 return null;
         }

        public async Task<RentACarAdmin> EditProfile(RentACarAdminEditProfile parameters)
        {
            var temp = await repo.EditProfile(parameters);
            if (temp != null)
                await unitOfWork.CompleteAsync();

            return temp;
        }

        public async Task<DiscountBasedOnPoints> AddDiscountBasedOnPoints(DiscountBasedOnPoints parameters)
        {
            var temp = await repo.AddDiscountBasedOnPoints(parameters);
            if (temp != null)
                await unitOfWork.CompleteAsync();

            return temp;
        }

    }
}
 