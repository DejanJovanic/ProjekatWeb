using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Model.Users;
using BookingAppBackend.Service.RentACar.Admins;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.RentACar
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        IAdminService adminService;
        public AdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }

        [HttpGet]
        [Route("GetAdmin")]
        public async Task<IActionResult> GetRentACarAdminAsync(string username)
        {
            var temp = await adminService.GetRentACarAdminAsync(username);

            if (temp != null)
                return Ok(temp);
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpPost]
        [Route("AddRentAdmin")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddRentACarAdmin(RentACarAdminAddParameters parameters)
        {
            if (ModelState.IsValid)
            {
                var temp = await adminService.AddRentACarAdmin(parameters);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(temp);
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpPost]
        [Route("AddGeneralAdmin")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddGeneralAdmin(AdminAddParameters parameters)
        {
            if (ModelState.IsValid)
            {
                var temp = await adminService.AddGeneralAdmin(parameters);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(temp);
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }
        [HttpPut]
        [Route("EditProfile")]
        [Authorize(Roles ="RentACarAdmin")]
        public async Task<IActionResult> EditProfile(RentACarAdminEditProfile parameters)
        {
            if (ModelState.IsValid)
            {
                var temp = await adminService.EditProfile(parameters);
                if (temp != null)
                    return Ok(temp);
                else
                    return null;
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied" });
        }

        [HttpPost]
        [Route("AddDiscountBasedOnPoints")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddDiscountBasedOnPoints(DiscountBasedOnPoints parameters)
        {
            if (ModelState.IsValid)
            {
                var temp = await adminService.AddDiscountBasedOnPoints(parameters);
                if (temp != null)
                    return Ok(temp);
                else
                    return null;
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied" });
        }
    }
}
