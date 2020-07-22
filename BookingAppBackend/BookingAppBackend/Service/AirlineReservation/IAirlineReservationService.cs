using BookingAppBackend.Model.Airlines;
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
        Task<ICollection<Reservation>> GetReservationsAsync(string username);
        Task<AirlineReservationResponse> AcceptReservation(ReservationOptionsParameter param, string username);
        Task<AirlineReservationResponse> RejectReservation(ReservationOptionsParameter param, string username);
        Task<AirlineReservationResponse> CancelReservation(ReservationOptionsParameter param, string username);
    }
}
