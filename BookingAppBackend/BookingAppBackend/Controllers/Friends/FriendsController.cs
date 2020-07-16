using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Users;
using BookingAppBackend.Service.Friends;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.Friends
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        IFriendsService service;
        IMapper mapper;

        public FriendsController(IFriendsService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetFriends()
        {
            var ret = await service.GetFriends(User.Identity.Name);
            return Ok(mapper.Map<IEnumerable<UserResource>>(ret));
        }
    }
}
