using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Airplane
{
    public class AirplaneService : IAirplaneService
    {
        IAirplaneRepository repo;
        IUnitOfWork unitOfWork;

        public AirplaneService(IAirplaneRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<AirplaneResponse> AddAirplane(BookingAppBackend.Model.Airlines.Airplane airplane, int airlaneId)
        {
            var ret = await repo.AddAirplane(airplane, airlaneId);
            await unitOfWork.CompleteAsync();
            return ret;

        }
    }
}
