using BookingAppBackend.Database.Contex;
using BookingAppBackend.Model;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.AuthentificationAndAuthorization
{
    public class LoginService : ILoginService
    {
        private UserManager<AuthentificationUser> manager;
        private BookingAppDbContext context;
        private readonly ApplicationSettings appSettings;

        public LoginService(UserManager<AuthentificationUser> manager, BookingAppDbContext context, IOptions<ApplicationSettings> appSettings)
        {
            this.manager = manager;
            this.context = context;
            this.appSettings = appSettings.Value;
        }

        public async Task<string> Login(string username, string password)
        {
            var ret = "";
            var user = await manager.FindByNameAsync(username);
            if(user != null) // + provera password-a
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name,user.UserName),
                        new Claim(ClaimTypes.Role, user.Role)
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                ret = tokenHandler.WriteToken(securityToken);
                
            }
            return ret;
        }
    }
}
