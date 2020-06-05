using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Database.Repository;
using BookingAppBackend.Model.Users;
using BookingAppBackend.Service.GeneralUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.UserGeneral
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralUserController : ControllerBase
    {
        private IGeneralUserService service;
        private readonly IMapper mapper;

        public GeneralUserController(IGeneralUserService service,IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("GetUser")]
        [Authorize(Roles ="User,AirlineAdmin")]
        public async Task<IActionResult> GetUser()
        {
            
            var response = await service.GetUserAsync(User.Identity.Name);

            if (response.Success)
            {
                try
                {
                    switch (response.Resource.Role)
                    {
                        case "User":
                            return Ok(new { User = mapper.Map<UserResource>((BookingAppBackend.Model.Users.User)response.Resource.Item) });
                        case "AirlineAdmin":
                            return Ok(new { User = mapper.Map<AirlineAdminResource>((AirlineAdmin)response.Resource.Item) });
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
    }
}