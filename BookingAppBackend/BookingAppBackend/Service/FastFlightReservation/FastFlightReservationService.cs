using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.FastFlightReservation
{
    public class FastFlightReservationService : IFastFlightReservationService
    {
        IFastFlightRepository repo;
        IUnitOfWork unitOfWork;

        public FastFlightReservationService(IFastFlightRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }
        public async Task<FastFlightResponse> Cancel(int airlineId, int fastFlightId, string username)
        {
            try
            {
                var temp = await repo.Cancel(airlineId,fastFlightId,username);
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
        public async Task<FastFlightResponse> Set(int airlineId, int fastFlightId, string username, ICollection<int> paidExtras, double loadWeight, string passportNum)
        {
            try
            {
                var temp = await repo.Set(airlineId,fastFlightId,username,paidExtras,loadWeight,passportNum);
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

        public async Task<IEnumerable<Model.Airlines.FastFlight>> Get(string username)
        {
            return await repo.Get(username);

        }
    }
}
