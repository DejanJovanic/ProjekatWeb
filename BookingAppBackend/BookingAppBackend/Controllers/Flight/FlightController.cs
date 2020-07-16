using System.Threading.Tasks;
using AutoMapper;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Airlines.Resources;
using BookingAppBackend.Service.AirlineAdmin;
using BookingAppBackend.Service.Flight;
using Microsoft.AspNetCore.Authorization;
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

       
    }
}
