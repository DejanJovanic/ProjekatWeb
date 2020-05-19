using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Model.AuthentificationAndAuthorization;
using BookingAppBackend.Service.AuthentificationAndAuthorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        ILoginService service;

        public LoginController(ILoginService service)
        {
            this.service = service;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody]UsernamePasswordResource credentials)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Username and password have to be supplied" });

            var token = await service.Login(credentials.Username, credentials.Password);
            if (token != "")
                return Ok(new { token });
            else
                return BadRequest(new { message = "Invalid username/password supplied" });
        }
    }
}