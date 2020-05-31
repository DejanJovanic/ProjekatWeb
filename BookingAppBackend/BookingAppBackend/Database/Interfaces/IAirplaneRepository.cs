using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IAirplaneRepository
    {
        Task<AirplaneResponse> AddAirplane(Airplane airplane, int airlineId);
    }
}
