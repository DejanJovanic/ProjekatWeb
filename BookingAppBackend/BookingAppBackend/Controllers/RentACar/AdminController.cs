﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Service.RentACar.Admins;
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
    }
}
