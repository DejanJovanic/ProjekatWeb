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
        [Authorize(Roles ="User")]
        [Route("GetFriends")]
        public async Task<IActionResult> GetFriends()
        {
            var ret = await service.GetFriends(User.Identity.Name);
            return Ok(mapper.Map<IEnumerable<UserResource>>(ret));
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("GetPendingRequests")]
        public async Task<IActionResult> GetPendingRequests()
        {
            var ret = await service.GetPendingRequests(User.Identity.Name);
            return Ok( mapper.Map<IEnumerable<UserResource>>(ret));
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        [Route("AcceptRequest")]
        public async Task<IActionResult> AcceptRequest(string friendUsername)
        {
            string username = User.Identity.Name;
            if (username.ToLower() == friendUsername.ToLower())
                return BadRequest(new { Message = "Invalid username supplied" });
            try
            {
                var ret = await service.AcceptRequest(username, friendUsername);
                if (ret.Success)
                    return Ok(mapper.Map<UserResource>(ret.Resource));
                else
                    return BadRequest(new { Message = ret.Message });
            }
            catch
            {
                return StatusCode(500);
            }
        }
        [HttpPost]
        [Authorize(Roles = "User")]
        [Route("SendRequest")]
        public async Task<IActionResult> SendRequest(string friendUsername)
        {
            string username = User.Identity.Name;
            if (username.ToLower() == friendUsername.ToLower())
                return BadRequest(new { Message = "Invalid username supplied" });
            try
            {
                var ret = await service.SendRequest(username, friendUsername);
                if (ret.Success)
                    return Ok(mapper.Map<UserResource>(ret.Resource));
                else
                    return BadRequest(new { Message = ret.Message });
            }
            catch
            {
                return StatusCode(500);
            }
        }
        [HttpPost]
        [Authorize(Roles = "User")]
        [Route("RejectRequest")]
        public async Task<IActionResult> RejectRequest(string friendUsername)
        {
            string username = User.Identity.Name;
            if (username.ToLower() == friendUsername.ToLower())
                return BadRequest(new { Message = "Invalid username supplied" });
            try
            {
                var ret = await service.RejectRequest(username, friendUsername);
                if (ret.Success)
                    return Ok(mapper.Map<UserResource>(ret.Resource));
                else
                    return BadRequest(new { Message = ret.Message });
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("Search")]
        public async Task<IActionResult> Search(UserSearchParams param)
        {
            if (string.IsNullOrWhiteSpace(param.Username) && string.IsNullOrWhiteSpace(param.Name) && string.IsNullOrWhiteSpace(param.LastName))
                return BadRequest(new { Message = "Invalid parameters supplied." });
            var ret = await service.Search(param);
            return Ok(mapper.Map<IEnumerable<UserResource>>(ret));
        }
    }
}
