using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Service.AirlineReservation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.FlightReservation
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightReservationController : ControllerBase
    {
        IAirlineReservationService service;
        public FlightReservationController(IAirlineReservationService service)
        {
            this.service = service;
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddReservation(ReservationParameter flightReservation)
        {
            if (flightReservation.Tickets == null || flightReservation.Tickets.Count() == 0)
                return BadRequest(new { Message = "Tickets have to be supplied." });
            try
            {
                var ret = await service.Add(flightReservation.Tickets);
                if (ret.Success)
                {               
                    return Ok(true);
                }                 
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
