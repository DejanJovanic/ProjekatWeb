using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Database.Contex;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Service.RentACar.Enterprises;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.RentACar
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnterpriseController : ControllerBase
    {
        IEnterpriseService enterpriseService;

        public EnterpriseController(IEnterpriseService enterpriseService)
        {
            this.enterpriseService = enterpriseService;
        }

        [HttpPut]
        [Authorize(Roles ="RentACarAdmin")]
        [Route("EditEnterpriseProfile")]
        public async Task<IActionResult> EditEnterpriseProfile(EditEnterpriseParameters enterprise)
        {
            if (ModelState.IsValid)
            {
                var temp = await enterpriseService.EditEnterpriseProfile(enterprise);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAllEnterprises()
        {
                
                
                var temp = await enterpriseService.GetAllEnterprises();
               if (temp != null)
                    return Ok(temp);
               else
                   return BadRequest(new { Message = "Something went wrong. Please, try again later." });
           
        }

        [HttpGet]
        [Route("GetOneEnterprise")]
        public async Task<IActionResult> GetOneEnterprise(int enterpriseId)
        {
          
                var temp = await enterpriseService.GetOneEnterprise(enterpriseId);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
           
        }

        [HttpGet]
        [Route("SearchEnterprises")]
        public async Task<IActionResult> SearchEnterprises(SearchEnterpriseParameters sep)
        {
            if (ModelState.IsValid)
            {
                var temp = await enterpriseService.SearchEnterprises(sep);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });

        }
    }
}
