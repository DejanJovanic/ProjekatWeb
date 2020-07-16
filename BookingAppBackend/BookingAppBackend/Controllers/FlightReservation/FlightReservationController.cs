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
        public async Task<IActionResult> AddReservation([FromBody]ICollection<TicketParameter> tickets)
        {
            if (tickets == null || tickets.Count() > 0)
                return BadRequest(new { Message = "Tickets have to be supplied." });
            try
            {
                var ret = await service.Add(tickets);
                if (ret.Success)
                {
                    var reservation = new Reservation();
                    reservation.AirlineTickets = new List<Ticket>();
                    foreach(var a in ret.Resource.AirlineTickets)
                    {
                        if (a.TicketOwner != null && a.TicketOwner.Username == User.Identity.Name)
                        {
                            reservation.AirlineTickets.Add(a);
                            continue;
                        }
                        else if (a.TicketOwner == null && a.InvitedBy.Username == User.Identity.Name)
                            reservation.AirlineTickets.Add(a);
                    }
                    return Ok(reservation);
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
