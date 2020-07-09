using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Service.AirlineAdmin;
using BookingAppBackend.Service.Flight;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.Flight
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightController : ControllerBase
    {
        private IFlightService service;
        private IAirlineAdminService adminService;
        private IMapper mapper;

        public FlightController(IFlightService service, IAirlineAdminService adminService, IMapper mapper)
        {
            this.service = service;
            this.adminService = adminService;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize(Roles ="AirlineAdmin")]
        [Route("Add")]
        public async Task<IActionResult> AddFlight(FlightAddParameter flight)
        {
            var user = await adminService.GetAdminAsync(User.Identity.Name);

            if (user == null)
                return BadRequest(new { Message = "User does not exist" });

            var ret = await service.AddFlight(flight, user.AirlineID);

            if (ret.Success)
                return Ok(mapper.Map<FlightResource>(ret.Resource));
            else
                return BadRequest(new { Message = ret.Message });
        }

        [HttpPut]
        [Authorize(Roles = "AirlineAdmin")]
        [Route("AddSeat")]
        public async Task<IActionResult> AddSeat(FlightAddSeats seats)
        {
            var user = await adminService.GetAdminAsync(User.Identity.Name);

            if (user == null)
                return BadRequest(new { Message = "User does not exist" });

            var ret = await service.AddSeats(seats.RowsTop, seats.RowsBottom, seats.ColumnsLeft, seats.ColumnsRight, user.AirlineID, seats.FlightId);

            if (ret.Success)
                return Ok(mapper.Map<FlightResource>(ret.Resource));
            else
                return BadRequest(new { Message = ret.Message });
        }

        [HttpDelete]
        [Authorize(Roles = "AirlineAdmin")]
        [Route("RemoveSeat")]
        public async Task<IActionResult> RemoveSeat(FlightSeatChange param)
        {
            var user = await adminService.GetAdminAsync(User.Identity.Name);

            if (user == null)
                return BadRequest(new { Message = "User does not exist" });

            var ret = await service.RemoveSeat(param.Row, param.Column, user.AirlineID, param.FlightId);

            if (ret.Success)
                return Ok(mapper.Map<FlightResource>(ret.Resource));
            else
                return BadRequest(new { Message = ret.Message });
        }


        [HttpPut]
        [Authorize(Roles = "AirlineAdmin")]
        [Route("DisableSeat")]
        public async Task<IActionResult> DisableSeat(FlightSeatChange param)
        {
            var user = await adminService.GetAdminAsync(User.Identity.Name);

            if (user == null)
                return BadRequest(new { Message = "User does not exist" });

            var ret = await service.DisableSeat(param.Row, param.Column, user.AirlineID, param.FlightId);

            if (ret.Success)
                return Ok(mapper.Map<FlightResource>(ret.Resource));
            else
                return BadRequest(new { Message = ret.Message });
        }
    }
}
