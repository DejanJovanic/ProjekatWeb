using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Users;
using BookingAppBackend.Service.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserService service;
        IMapper mapper;

        public UserController(IUserService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Search(string username,string name,string lastName)
        {
            if (string.IsNullOrWhiteSpace(username) && string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(lastName))
                return BadRequest(new { Message = "Invalid parameters supplied." });
            var param = new UserSearchParams { LastName = lastName, Name = name, Username = username };
            var ret = await service.Search(param);
            return Ok(mapper.Map<IEnumerable<UserResource>>(ret));
        }

        [HttpPost]
        public async Task<IActionResult> Add(UserAdd param)
        {
            if (ModelState.IsValid)
            {
                var temp = await service.Add(param, Url);
                if (temp.Success)
                    return Ok(mapper.Map<UserResource>(temp.Resource));
                else
                    return BadRequest(new { Message = temp.Message });
            }
            else
                return BadRequest(new  { Message = "Invalid parameters supplied" });
        }

        [HttpPut]
        [Authorize("User")]
        public async Task<IActionResult> Edit(UserEdit param)
        {
            if (ModelState.IsValid)
            {
                var temp = await service.Edit(param, User.Identity.Name);
                if (temp.Success)
                    return Ok(mapper.Map<UserResource>(temp.Resource));
                else
                    return BadRequest(new { Message = temp.Message });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied" });
        }
    }
}
