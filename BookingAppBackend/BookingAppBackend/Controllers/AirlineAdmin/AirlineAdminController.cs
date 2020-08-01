using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Users;
using BookingAppBackend.Service.AirlineAdmin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.AirlineAdmin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineAdminController : ControllerBase
    {
        private IAirlineAdminService service;
        private IMapper mapper;

        public AirlineAdminController(IAirlineAdminService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> Add(AirlineAdminAdd param)
        {
            if (ModelState.IsValid)
            {
                var temp = await service.Add(param);
                if (temp.Success)
                    return Ok(mapper.Map<AirlineAdminResource>(temp.Resource));
                else
                    return BadRequest(new { Message = temp.Message });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied" });
        }

        [HttpPut]
        [Authorize("AirlineAdmin")]
        public async Task<IActionResult> Edit(UserEdit param)
        {
            if (ModelState.IsValid)
            {
                var temp = await service.Edit(param, User.Identity.Name);
                if (temp.Success)
                    return Ok(mapper.Map<AirlineAdminResource>(temp.Resource));
                else
                    return BadRequest(new { Message = temp.Message });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied" });
        }
    }
}
