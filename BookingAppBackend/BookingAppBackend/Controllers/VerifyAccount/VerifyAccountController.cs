using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Service.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.VerifyAccount
{
    [Route("api/[controller]")]
    [ApiController]
    public class VerifyAccountController : ControllerBase
    {
        private UserManager<AuthentificationUser> manager;
        private IUserService userService;

        public VerifyAccountController(UserManager<AuthentificationUser> manager, IUserService userService)
        {
            this.manager = manager;
            this.userService = userService;
        }

        [HttpGet]   
        public async Task<IActionResult> ConfirmEmail(string username, string token)
        {
            if (username == null || token == null)
                return null;
            var user = await manager.FindByNameAsync(username);
            if (user != null)
            {
                var res = await manager.ConfirmEmailAsync(user, token);
                if (res.Succeeded)
                {
                    await userService.EnableUser(username);
                    return Redirect("localhost:4200/Login");
                   
                }
                else
                    return BadRequest(false);
            }
            else
                return null;
        }

        [HttpPost]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword(string username, string token,string password)
        {
            if (username == null || token == null)
                return null;
            var user = await manager.FindByNameAsync(username);
            if (user != null)
            {
                var temp = await manager.GetRolesAsync(user);
                if (temp.Contains("AirlineAdmin") || temp.Contains("RentACarAdmin"))
                {
                    var res = await manager.ResetPasswordAsync(user, token, password);
                    if (res.Succeeded)
                    {
                        await userService.EnableUser(username);
                        return Ok(true);

                    }
                    else
                        return BadRequest(false);
                }
                else
                    return BadRequest(false);
            
            }
            else
                return BadRequest(false);
        }
    }
}
