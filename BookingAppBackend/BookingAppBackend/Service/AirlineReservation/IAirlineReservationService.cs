using BookingAppBackend.Model.Airlines.Parameters;
using BookingAppBackend.Model.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.AirlineReservation
{
    public interface IAirlineReservationService
    {
        Task<AirlineReservationResponse> Add(ICollection<TicketParameter> tickets);
    }
}
