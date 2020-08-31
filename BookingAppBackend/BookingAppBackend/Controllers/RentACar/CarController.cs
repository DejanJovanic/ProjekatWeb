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
using BookingAppBackend.Model.RentACar;

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
        //[Authorize(Roles = "RentACarAdmin")]
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
        //[Authorize(Roles = "RentACarAdmin")]
        [Route("DeleteCar")]
        public async Task<IActionResult> DeleteCar(int enterpriseId, int carId)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.DeleteCar(enterpriseId, carId);
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

        [HttpPost]
        [Route("SetReservation")]
        public async Task<IActionResult> SetReservation(CarReservation parameters)
        {

            if (ModelState.IsValid)
            {
                var temp = await carService.SetReservation(parameters);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }
        [HttpPost]
        [Route("SetReservationForDiscount")]
        public async Task<IActionResult> SetReservationForDiscount(CarReservation parameters)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.SetReservationForDiscount(parameters);
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
        public async Task<IActionResult> GetOneCar(int enterpriseId, int carId)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.GetOneCar(enterpriseId, carId);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpPost]
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

        [HttpPost]
       // [Authorize(Roles = "User")]
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
        //[Authorize(Roles = "User")]
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
        //[Authorize(Roles = "RentACarAdmin")]
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

        [HttpPost]
        // [Authorize(Roles = "User")]
        [Route("CreateReservation")]
        public async Task<IActionResult> CreateReservation(ReservationParameters paramss)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.CreateReservation(paramss);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }
        [HttpPost]
        // [Authorize(Roles = "User")]
        [Route("CreateReservationForCarOnDiscount")]
        public async Task<IActionResult> CreateReservationForCarOnDiscount(DiscountDetails paramss)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.CreateReservationForCarOnDiscount(paramss);
                if (temp != null)
                    return Ok(temp);
                else
                    return BadRequest(new { Message = "Something went wrong. Please, try again later." });
            }
            else
                return BadRequest(new { Message = "Invalid parameters supplied." });
        }

        [HttpGet]
        [Route("GetOneCarOnDiscount")]
        public async Task<IActionResult> GetOneCarOnDiscount(int enterpriseId, int carId)
        {
            if (ModelState.IsValid)
            {
                var temp = await carService.GetOneCarOnDiscount(enterpriseId, carId);
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
