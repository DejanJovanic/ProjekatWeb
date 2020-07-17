using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Responses;
using BookingAppBackend.Service.Seat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Flight
{
    public class FlightService : IFlightService
    {
        private ISeatService seatService;
        private IFlightRepository repo;
        private IUnitOfWork unitOfWork;

        public FlightService(ISeatService seatService, IFlightRepository repo, IUnitOfWork unitOfWork)
        {
            this.seatService = seatService;
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<FlightResponse> AddFlight(FlightAddParameter flight, int airlineId)
        {
            try
            {
                var temp = await repo.AddFlight(flight, airlineId);
                if (temp.Success)
                {
                    await unitOfWork.CompleteAsync();
                }

                return temp;

            }
            catch
            {
                return new FlightResponse("Something went wrong. Please, try again later.");
            }
        }

        public async Task<FlightDetailsResponse> GetDetails(int flightId)
        {
            var temp = await repo.GetFlightAsync(flightId);
            if (temp != null)
            {
                var ret = new FlightDetails();
                var airplane = await seatService.GetSeats(flightId);
                if (airplane.Success)
                {
                    ret.Airplane = airplane.Resource;
                    ret.Extras = temp.PaidExtras;
                    ret.LuggageOptions = temp.WeightPricings;
                    ret.Price = temp.Price;
                    return new FlightDetailsResponse(ret);
                }
                else
                    return new FlightDetailsResponse("Unable to retrieve flight details");
            }
            else
                return new FlightDetailsResponse("Flight with given id does not exist .");
        }
     
    }
}
