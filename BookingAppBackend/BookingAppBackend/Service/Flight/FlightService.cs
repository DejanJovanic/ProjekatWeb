using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Flight
{
    public class FlightService : IFlightService
    {
        private IFlightRepository repo;
        private IUnitOfWork unitOfWork;

        public FlightService(IFlightRepository repo, IUnitOfWork unitOfWork)
        {
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
     
    }
}
