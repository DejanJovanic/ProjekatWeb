using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.Airplane
{
    public interface IAirplaneService
    {
        Task<AirplaneResponse> AddAirplane(BookingAppBackend.Model.Airlines.Airplane airplane, int airlaneId);
    }
}
