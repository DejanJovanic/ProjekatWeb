﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Service.FastFlightReservation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.FastFlightReservation
{
    [Route("api/[controller]")]
    [ApiController]
    public class FastFlightReservationController : ControllerBase
    {
        private IFastFlightReservationService service;
        private IMapper mapper;

        public FastFlightReservationController(IFastFlightReservationService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize("User")]
        public async Task<IActionResult> GetFlights()
        {
            var ret = await service.Get(User.Identity.Name);
            foreach(var a in ret)
            {
                foreach (var b in a.Flight.PaidExtras)
                    b.FastFlights = null;

                foreach (var b in a.PaidExtras)
                    b.FastFlight = null;

            }
            return Ok(mapper.Map<IEnumerable<FastFlightResource>>(ret));
        }

        [HttpPost]
        [Authorize("User")]
        public async Task<IActionResult> AddFlight(FastFlightReservationParameter param)
        {
            var ret = await service.Set(param.AirlineId, param.FastFlightId, User.Identity.Name, param.PaidExtras != null ? param.PaidExtras : new List<int>(), param.LoadWeight,param.PassportNumber);

            if (ret.Success)
            {
                ret.Resource.User = null;
                foreach(var a in ret.Resource.PaidExtras)
                {
                    a.FastFlight = null;
                    a.PaidExtra.FastFlights = null;
                    a.PaidExtra.Tickets = null;
                }
                ret.Resource.Flight.PaidExtras = null;
                return Ok(mapper.Map<FastFlightResource>(ret.Resource));
            }       
            else
                return BadRequest(new { Message = ret.Message });
        }

        [HttpDelete]
        [Authorize("User")]
        public async Task<IActionResult> AddFlight(int airlineId,int fastFlightId)
        {
            var ret = await service.Cancel(airlineId, fastFlightId, User.Identity.Name);

            if (ret.Success)
            {
                ret.Resource.User = null;
                foreach (var a in ret.Resource.PaidExtras)
                {
                    a.FastFlight = null;
                    a.PaidExtra.FastFlights = null;
                    a.PaidExtra.Tickets = null;
                }
                ret.Resource.Flight.PaidExtras = null;
                return Ok(mapper.Map<FastFlightResource>(ret.Resource));
            }
            else
                return BadRequest(new { Message = ret.Message });
        }
    }
}