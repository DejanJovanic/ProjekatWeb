using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.FastFlight
{
    public class FastFlightService : IFastFlightService
    {
        IFastFlightRepository repo;
        IUnitOfWork unitOfWork;

        public FastFlightService(IFastFlightRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<FastFlightResponse> Add(int airlineId, int flightId, int row, int column, double discountPercentage)
        {
            try
            {
                var temp = await repo.Add(airlineId,flightId,row,column,discountPercentage);
                if (temp.Success)
                {
                    await unitOfWork.CompleteAsync();
                }

                return temp;

            }
            catch
            {
                return new FastFlightResponse("Something went wrong. Please, try again later.");
            }
        }

        public async Task<IEnumerable<Model.Airlines.FastFlight>> Get(int airlineId)
        {
            var temp = await repo.Get(airlineId);
            var ret = new List<Model.Airlines.FastFlight>();

            foreach(var a in temp)
            {
                if (a.User == null)
                    ret.Add(a);
            }

            return ret;
        }
    }
}
