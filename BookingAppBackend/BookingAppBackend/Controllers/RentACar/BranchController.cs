using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Service.RentACar.Branch;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.RentACar
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchController : ControllerBase
    {
        IBranchService branchService;

        public BranchController(IBranchService branchService)
        {
            this.branchService = branchService;
        }

        [HttpPost]
        [Authorize(Roles = "RentACarAdmin")]
        [Route("AddBranch")]
        public async Task<IActionResult> AddBranch(AddBranchParameters enterpriseBranch)
        {
            if (ModelState.IsValid)
            {
                var temp = await branchService.AddBranch(enterpriseBranch);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpDelete]
        [Authorize(Roles = "RentACarAdmin")]
        [Route("DeleteBranch")]
        public async Task<IActionResult> DeleteBranch(int enterpriseId, int branchId)
        {
            if (ModelState.IsValid)
            {
                var temp = await branchService.DeleteBranch(enterpriseId, branchId);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpPut]
        [Authorize(Roles = "RentACarAdmin")]
        [Route("EditBranch")]
        public async Task<IActionResult> EditBranch(EditBranchParameters enterpriseBranch)
        {
            if (ModelState.IsValid)
            {
                var temp = await branchService.EditBranch(enterpriseBranch);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Route("GetAllBranches")]
        public async Task<IActionResult> GetAllBranches(int enterpriseId)
        {
            
                var temp = await branchService.GetAllBranches(enterpriseId);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            
        }

        [HttpGet]
        [Route("GetOneBranch")]
        public async Task<IActionResult> GetOneBranch(int enterpriseId, int branchId)
        {
            if (ModelState.IsValid)
            {
                var temp = await branchService.GetOneBranch(enterpriseId, branchId);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Route("GetBranchAddress")]
        public async Task<IActionResult> GetBranchAddress(int branchId)
        {

            var temp = await branchService.GetBranchAddress(branchId);
            if (temp != null)
                return Ok(temp);
            else
                return BadRequest(new { Message = "Something went wrong. Please, try again later." });

        }

       
    }
}
