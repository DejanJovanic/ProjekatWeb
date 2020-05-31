using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository
{
    public class AirplaneRepository : Repository , IAirplaneRepository
    {
        public AirplaneRepository(BookingAppDbContext context) : base(context) { }

        public async Task<AirplaneResponse> AddAirplane(Airplane airplane,int airlineId)
        {
            var airline = context.Airlines.FirstOrDefault(i => i.Id == airlineId);

            if (airline != null)
            {
                airline.Airplanes.Add(airplane);
                return new AirplaneResponse(airplane);
            }
            else
                return new AirplaneResponse("Airline with given id does not exist");
        }
    }
}
