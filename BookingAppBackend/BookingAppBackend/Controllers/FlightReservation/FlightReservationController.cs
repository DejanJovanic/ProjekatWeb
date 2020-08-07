using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
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
        IMapper mapper;

        public FlightReservationController(IAirlineReservationService service, IMapper mapper)
        {
            this.service = service;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles ="User")]
        public async Task<IActionResult> GetReservations()
        {
            try
            {
                var ret = await service.GetReservationsAsync(User.Identity.Name);
                if (ret != null)
                {
                    var res = new List<ReservationParameter>();
                    foreach(var a in ret)
                    {
                        var temp = new ReservationParameter();
                        temp.Flight = mapper.Map<FlightResource>(a.AirlineTickets.First().Flight);
                        temp.Airline = mapper.Map<AirlineResource>(a.AirlineTickets.First().Airline);
                        temp.Tickets = mapper.Map<ICollection<TicketParameter>>(a.AirlineTickets);
                        foreach(var b in temp.Tickets)
                        {
                            b.Passport = "";
                        }
                        res.Add(temp);
                    }
                    return Ok(res);
                }
                else
                    return BadRequest("Something went wrong");
            }
            catch
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddReservation(ReservationParameter flightReservation)
        {
            if (flightReservation.Tickets == null || flightReservation.Tickets.Count() == 0)
                return BadRequest(new { Message = "Tickets have to be supplied." });
            try
            {
                var ret = await service.Add(flightReservation.Tickets,flightReservation.InvestingPoints);
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

        [HttpPost]
        [Authorize(Roles ="User")]
        [Route("Accept")]
        public async Task<IActionResult> AcceptReservation(ReservationOptionsParameter param)
        {
            if (param.LuggageWeight < 0 || string.IsNullOrWhiteSpace(param.PassportNumber))
                return BadRequest("Invalid parameters supplied");
            try
            {
                    var ret = await service.AcceptReservation(param, User.Identity.Name,param.InvestingPoints);
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

        [HttpPost]
        [Authorize(Roles = "User")]
        [Route("Reject")]
        public async Task<IActionResult> RejectReservation(ReservationOptionsParameter param)
        {
            try
            {
                var ret = await service.RejectReservation(param, User.Identity.Name);
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

        [HttpPost]
        [Authorize(Roles = "User")]
        [Route("Cancel")]
        public async Task<IActionResult> CancelReservation(ReservationOptionsParameter param)
        {
            try
            {
                var ret = await service.CancelReservation(param, User.Identity.Name);
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
