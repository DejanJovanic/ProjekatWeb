using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;
using BookingAppBackend.Service.RentACar.Cars;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Service.RentACar.Enterprises;

namespace BookingAppBackend.Controllers.RentACar
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        ICarService carService;
        IEnterpriseService enterpriseService;

        public CarController(ICarService carService, IEnterpriseService enterpriseService)
        {
            this.carService = carService;
            this.enterpriseService = enterpriseService;
        }

        [HttpPost]
        [Authorize(Roles = "RentACarAdmin")]
        [Route("AddCar")]
        public async Task<IActionResult> AddCar(AddCarParameters car)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.AddCar(car);
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
        [Route("DeleteCar")]
        public async Task<IActionResult> DeleteCar(GetAndDeleteParameters gadp)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.DeleteCar(gadp);
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
        [Route("EditCar")]
        public async Task<IActionResult> EditCar(EditCarParameters car)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.EditCar(car);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Route("GetAllCars")]
        public async Task<IActionResult> GetAllCars(int enterpriseId)
        {
                var temp = await carService.GetAllCars(enterpriseId);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            
        }

        [HttpGet]
        [Route("GetOneCar")]
        public async Task<IActionResult> GetOneCar(GetAndDeleteParameters gadp)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.GetOneCar(gadp);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Route("SearchAllCars")]
        public async Task<IActionResult> SearchAllCars(SearchCarParameters scp)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.SearchAllCars(scp);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("SearchCarsForRent")]
        public async Task<IActionResult> SearchCarsForRent(SearchCarsForRentParameters scfrp)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.SearchCarsForRent(scfrp);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("GetCarsOnDiscount")]
        public async Task<IActionResult> GetCarsOnDiscount(int enterpriseId)
        {
            var temp = await carService.GetCarsOnDiscount(enterpriseId);
            if (temp != null)
                return Ok(temp);
            else
                return BadRequest(new { Message = "Something went wrong. Please, try again later." });
        }

        [HttpPost]
        [Authorize(Roles = "RentACarAdmin")]
        [Route("SetCarOnDiscount")]
        public async Task<IActionResult> SetCarOnDiscount(SetDiscountParameters sdp)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.SetCarOnDiscount(sdp);
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
