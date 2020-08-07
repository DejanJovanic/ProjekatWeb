using BookingAppBackend.Database.Contex;
using BookingAppBackend.Model;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
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
        private IConfiguration configration;
        private BookingAppDbContext context;

        public LoginService(BookingAppDbContext context,UserManager<AuthentificationUser> manager, IConfiguration configration)
        {
            this.manager = manager;
            this.configration = configration;
            this.context = context;
        }

        public async Task<string> Login(string username, string password)
        {
            var ret = "";
            var user = await manager.FindByNameAsync(username);
            
            if(user != null) 
            {
                var isOk = await manager.CheckPasswordAsync(user, password);

                if (isOk)
                {
                    if (!user.IsPasswordOk)
                        return "PasswordChangeRequired";
                    var role = await manager.GetRolesAsync(user);
                    if (role.First() == "User" && !(await manager.IsEmailConfirmedAsync(user)))
                        return "";
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim(ClaimTypes.Name,user.UserName),
                        new Claim(ClaimTypes.Role, role.First())
                        }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configration["ApplicationSettings:JWT_Secret"])), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    ret = tokenHandler.WriteToken(securityToken);
                }
                else
                    return ret;
          
                
            }
            return ret;
        }

        public async Task<string> ChangePassword(string username, string oldPassword, string newPassword)
        {
            var admin = await manager.FindByNameAsync(username);
            if (admin != null)
            {
                var temp = await manager.ChangePasswordAsync(admin, oldPassword, newPassword);
                if (temp.Succeeded)
                {
                    admin.IsPasswordOk = true;
                    context.SaveChanges();
                    return null;
                }         
                else
                    return temp.Errors.First().Description;

            }
            else
                return "Admin with given username does not exist";

        }
    }
}
