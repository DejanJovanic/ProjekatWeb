using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Service.RentACar.SpecialOffers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookingAppBackend.Controllers.RentACar
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialOfferController : ControllerBase
    {
        ISpecialOfferService specialOfferService;

        public SpecialOfferController(ISpecialOfferService spf)
        {
            this.specialOfferService = spf;
        }

        [HttpPost]
       // [Authorize(Roles ="RentACarAdmin")]
        [Route("AddSpecialOffer")]
        public async Task<IActionResult> AddSpecialOffer(AddSpecialOfferParameters specialOffer)
        {
            if (ModelState.IsValid)
            {
                var temp = await specialOfferService.AddSpecialOffer(specialOffer);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpDelete]
        //[Authorize(Roles = "RentACarAdmin")]
        [Route("DeleteSpecialOffer")]
        public async Task<IActionResult> DeleteSpecialOffer(int enterpriseId, int specialOfferId)
        {
            if (ModelState.IsValid)
            {
                var temp = await specialOfferService.DeleteSpecialOffer(enterpriseId, specialOfferId);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpPut]
        //[Authorize(Roles = "RentACarAdmin")]
        [Route("EditSpecialOffer")]
        public async Task<IActionResult> EditSpecialOffer(EditSpecialOfferParameters specialOffer)
        {
            if (ModelState.IsValid)
            {
                var temp = await specialOfferService.EditSpecialOffer(specialOffer);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Route("GetAllSpecialOffers")]
        public async Task<IActionResult> GetAllSpecialOffers(int enterpriseId)
        {
           
                var temp = await specialOfferService.GetAllSpecialOffers(enterpriseId);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            
        }

        [HttpGet]
        [Route("GetOneSpecialOffer")]
        public async Task<IActionResult> GetOneSpecialOffer(int enterpriseId, int specialOfferId)
        {
            if (ModelState.IsValid)
            {
                var temp = await specialOfferService.GetOneSpecialOffer(enterpriseId, specialOfferId);
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
