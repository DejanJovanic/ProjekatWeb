using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.AuthentificationAndAuthorization
{
    public interface ILoginService
    {
        Task<string> Login(string username, string password);
        Task<string> ChangePassword(string username, string oldPassword, string newPassword);
    }
}
