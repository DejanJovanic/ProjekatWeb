using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Database.Repository;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.Responses;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.GeneralUser
{
    public class GeneralUserService : IGeneralUserService
    {
        private IUserRepository userRepository;
        private IAirlineAdminRepository airlineAdminRepository;
        private IRentACarAdminRepository repo;
        private IAdminRepository repo2;

        public GeneralUserService(IAdminRepository repo1, IUserRepository userRepository, IAirlineAdminRepository airlineAdminRepository, IRentACarAdminRepository repo)
        {
            this.userRepository = userRepository;
            this.airlineAdminRepository = airlineAdminRepository;
            this.repo = repo;
            this.repo2 = repo1;
        }

        public async Task<GeneralUserResponse> GetUserAsync(string username)
        {
            var airlineAdmin = await airlineAdminRepository.GetAirlineAdminAsync(username);

            if (airlineAdmin != null)
                return new GeneralUserResponse((airlineAdmin, "AirlineAdmin"));
            
            var user = await userRepository.GetUserAsync(username);

            if (user != null)
                return new GeneralUserResponse((user, "User"));

            var admin = await repo.GetRentACarAdminAsync(username);

            if (admin != null)
                return new GeneralUserResponse((admin, "RentACarAdmin"));

            var generalAdmin = await repo2.GetAdminAsync(username);

            if (generalAdmin != null)
                return new GeneralUserResponse((generalAdmin, "Admin"));

            return new GeneralUserResponse("User with given username does not exist.");

        }
    }
}
