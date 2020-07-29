using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Service.AirlineAdmin;
using BookingAppBackend.Service.Seat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.Seat
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private ISeatService service;
        private IAirlineAdminService adminService;
        private IMapper mapper;

        public SeatController(ISeatService service, IAirlineAdminService adminService, IMapper mapper)
        {
            this.service = service;
            this.adminService = adminService;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize(Roles = "AirlineAdmin")]
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

        [HttpGet]
        public async Task<IActionResult> GetSeat(int flightId)
        {

            var ret = await service.GetSeats(flightId);

            if (ret.Success)
                return Ok(mapper.Map<FlightResource>(ret.Resource));
            else
                return BadRequest(new { Message = ret.Message });
        }

        [HttpDelete]
        [Authorize(Roles = "AirlineAdmin")]
        public async Task<IActionResult> RemoveSeat(int flightId,int column,int row)
        {

        
        var user = await adminService.GetAdminAsync(User.Identity.Name);

            if (user == null)
                return BadRequest(new { Message = "User does not exist" });

            var ret = await service.RemoveSeat(row, column, user.AirlineID, flightId);

            if (ret.Success)
                return Ok(mapper.Map<FlightResource>(ret.Resource));
            else
                return BadRequest(new { Message = ret.Message });
        }


        [HttpPut]
        [Authorize(Roles = "AirlineAdmin")]
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
