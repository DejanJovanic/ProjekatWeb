using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.Responses;
using BookingAppBackend.Model.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.AirlineAdmin
{
    public class AirlineAdminService : IAirlineAdminService
    {
        private IAirlineAdminRepository repo;
        private IUnitOfWork unitOfWork;
        private UserManager<AuthentificationUser> manager;

        public AirlineAdminService(IAirlineAdminRepository repo, IUnitOfWork unitOfWork, UserManager<AuthentificationUser> manager)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
            this.manager = manager;
        }

        public async Task<BookingAppBackend.Model.Users.AirlineAdmin> GetAdminAsync(string username)
        {
            return await repo.GetAirlineAdminAsync(username);
        }

        public async Task<AirlineAdminResponse> Add(AirlineAdminAdd admin)
        {
            var newAdmin = new BookingAppBackend.Model.Users.AirlineAdmin();
            var user = new AuthentificationUser();
            user.UserName = admin.Username;
            newAdmin.Username = admin.Username;
            user.Email = admin.Email;
            newAdmin.Name = admin.Name;
            newAdmin.LastName = admin.LastName;
            newAdmin.PhoneNumber = admin.PhoneNumber;
            newAdmin.City = admin.City;
            newAdmin.AirlineID = admin.AirlineID;
            if (await manager.FindByNameAsync(admin.Username) == null)
            {

                var ok = await manager.CreateAsync(user, admin.Password);
                if (ok.Succeeded)
                {
                    ok = await manager.AddToRoleAsync(user, "AirlineAdmin");
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

    
        public async Task<AirlineAdminResponse> Edit(UserEdit details,string username)
        {
            var temp = await repo.EditAirlineAdminAsync(details, username);
            if (temp.Success)
                await unitOfWork.CompleteAsync();

            return temp;
        }
    }
}
