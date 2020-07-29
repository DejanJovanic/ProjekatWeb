using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Service.AirlineAdmin;
using BookingAppBackend.Service.FastFlight;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.FastFlight
{
    [Route("api/[controller]")]
    [ApiController]
    public class FastFlightController : ControllerBase
    {
        private IFastFlightService service;
        private IAirlineAdminService adminService;
        private IMapper mapper;

        public FastFlightController(IFastFlightService service, IAirlineAdminService adminService, IMapper mapper)
        {
            this.service = service;
            this.adminService = adminService;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetFlights(int airlineId)
        {
            return  Ok(mapper.Map<IEnumerable<FastFlightResource>>(await service.Get(airlineId)));
        }

        [HttpPost]
        [Authorize("AirlineAdmin")]
        public async Task<IActionResult> AddFlight(FastFlightAddParameter flight)
        {
            var user = await adminService.GetAdminAsync(User.Identity.Name);

            if (user == null)
                return BadRequest(new { Message = "User does not exist" });

            var ret = await service.Add(user.AirlineID, flight.FlightId, flight.Row, flight.Column, flight.DiscountPercentage);

            if (ret.Success)
                return Ok(mapper.Map<FastFlightResource>(ret.Resource));
            else
                return BadRequest(new { Message = ret.Message });
        }
    }
}
