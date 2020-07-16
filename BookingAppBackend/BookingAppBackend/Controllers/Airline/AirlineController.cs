﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Service.Airline;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.Airline
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineController : ControllerBase
    {
        IAirlineService service;
        IMapper mapper;

        public AirlineController(IAirlineService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("Search")]
        public async Task<IActionResult> SearchAirlines(AirlineSearchParameters param)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Message = "Invalid search parameters supplied" });
            var ret = await service.GetAirlines(param);
            
            return Ok(new { Airlines = mapper.Map<IEnumerable<AirlineResource>>(ret) }); 

        }


        [HttpGet]
        [Authorize(Roles ="AirlineAdmin")]
        public async Task<IActionResult> GetAirline(int airlineId)
        {
            if (airlineId < 0)
                return BadRequest(new { Message = "Airline id cannot be negative number." });

            var temp = await service.CheckAdmin(User.Identity.Name, airlineId);

            if (temp.Success)
            {
                var ret = await service.GetAirline(airlineId);
                return Ok(mapper.Map<AirlineResource>(ret));

            }
            else
                return BadRequest(new { Message = temp.Message });
        }

        [HttpPost]
        [Authorize(Roles ="AirlineAdmin")]
        [Route("Edit")]
        public async Task<IActionResult> EditAirline(AirlineParameter airline)
        {
            var temp = await service.CheckAdmin(User.Identity.Name, airline.Id);
            if (temp.Success)
            {
                var ret = await service.EditAirlineAsync(airline);
                return Ok(mapper.Map<AirlineResource>(ret));

            }
            else
                return BadRequest(new { Message = temp.Message });
        }
    }
}
