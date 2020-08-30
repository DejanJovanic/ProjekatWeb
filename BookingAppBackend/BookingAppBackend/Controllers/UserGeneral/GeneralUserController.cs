using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Database.Repository;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Model.Users;
using BookingAppBackend.Service.GeneralUser;
using BookingAppBackend.Utils.EMailSender;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.UserGeneral
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralUserController : ControllerBase
    {
        private UserManager<AuthentificationUser> userManager;
        private IGeneralUserService service;
        private readonly IMapper mapper;

        public GeneralUserController(UserManager<AuthentificationUser> userManager, IGeneralUserService service, IMapper mapper)
        {
            this.userManager = userManager;
            this.service = service;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles ="User,AirlineAdmin")]
        public async Task<IActionResult> GetUser()
        {
            
            var response = await service.GetUserAsync(User.Identity.Name);

            if (response.Success)
            {
                try
                {
                    var user = await userManager.FindByNameAsync(User.Identity.Name);
                    var email = await userManager.GetEmailAsync(user);
                    switch (response.Resource.Role)
                    {
                        case "User":
                            var userRet = mapper.Map<UserResource>((Model.Users.User)response.Resource.Item);
                            userRet.Email = email;
                            return Ok(new { User = userRet });
                        case "AirlineAdmin":
                            var aaRet = mapper.Map<AirlineAdminResource>((BookingAppBackend.Model.Users.AirlineAdmin)response.Resource.Item);
                            aaRet.Email = email;
                            return Ok(new { User = aaRet});
                        default:
                            return StatusCode(500);
                    }
                }
                catch
                {
                    return StatusCode(500);
                }
               
            }
            else
            {
                return BadRequest(new { message = response.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "User,AirlineAdmin")]
        [Route("ResetPassword")]
        public async Task<IActionResult> ResetPassword()
        {

            try
            {
                var user = await userManager.FindByNameAsync(User.Identity.Name);
                if(user != null)
                {
                    var token = await userManager.GeneratePasswordResetTokenAsync(user);
                    var temp = userManager.RemovePasswordAsync(user);
                    var sender = new EmailSender();
                    sender.SendResetPasswordMail(user.Email, token, user.UserName);
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
             
            }
            catch
            {
                return StatusCode(500);
            }

        }
    }
}