using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Service.AirlineAdmin;
using BookingAppBackend.Service.Airplane;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.Airplane
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirplaneController : ControllerBase
    {
        IAirplaneService service;
        IAirlineAdminService adminService;

        public AirplaneController(IAirplaneService service, IAirlineAdminService adminService)
        {
            this.service = service;
            this.adminService = adminService;
        }

        //[HttpPost]
        //[Authorize(Roles = "AirlineAdmin")]
        //[Route("Add")]
        //public async Task<IActionResult> AddAirplane(BookingAppBackend.Model.Airlines.Airplane airplane)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(new { Message = "Invalid airplane sent." });

        //    var admin = await adminService.GetAdminAsync(User.Identity.Name);

        //    if (admin == null)
        //        return BadRequest(new { Message = "Given Admin does not exist" });

        //    try
        //    {
        //        var temp = await service.AddAirplane(airplane,admin.AirlineID);
        //        if (temp.Success)
        //        {
        //            return Ok(temp.Resource);
        //        }
        //        else
        //            return BadRequest(new { Message = temp.Message });

        //    }
        //    catch
        //    {
        //        return StatusCode(500);
        //    }
        //}
    }
}
