using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Database.Contex;
using BookingAppBackend.Model.Airlines;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookingAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineRatings : ControllerBase
    {

        BookingAppDbContext context;

        public AirlineRatings(BookingAppDbContext context)
        {
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Rate(UserRate param)
        {
            var airline = context.Airlines.Include(i => i.Tickets).ThenInclude(i => i.Flight).ThenInclude(i => i.Ratings).Include(i => i.Ratings).FirstOrDefault(i => i.Id == param.AirlineId);
            if(param.FlightRating > 5 || param.FlightRating < 0 || param.AirlineRating < 0 || param.AirlineRating < 0 )
                return BadRequest(new { Message = "Invalid rating" });
            if (airline != null)
            {
                var ticket = airline.Tickets.FirstOrDefault(i => i.Id == param.TicketId);
                if(ticket != null)
                {
                    ticket.Flight.Ratings.Add(new FlightRating() { DateTime = DateTime.Now, Rate = (float)param.FlightRating });
                    airline.Ratings.Add(new AirlineRating { Rate = (float)param.AirlineRating, DateTime = DateTime.Now });
                    await context.SaveChangesAsync();
                    return Ok(true);
                }
                else
                    return BadRequest(new { Message = "Ticket not found" });
            }
            else
                return BadRequest(new { Message = "Airline not found" });

        }
    }
}
