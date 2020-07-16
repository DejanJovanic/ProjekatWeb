using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Users;
using BookingAppBackend.Service.FriendRequests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.FriendRequest
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendRequestController : ControllerBase
    {
        IFriendRequestService service;
        IMapper mapper;

        public FriendRequestController(IFriendRequestService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetPendingRequests()
        {
            var ret = await service.GetPendingRequests(User.Identity.Name);
            return Ok(mapper.Map<IEnumerable<UserResource>>(ret));
        }

        [HttpPut]
        [Authorize(Roles = "User")]

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
        [HttpDelete]
        [Authorize(Roles = "User")]
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
    }
}
