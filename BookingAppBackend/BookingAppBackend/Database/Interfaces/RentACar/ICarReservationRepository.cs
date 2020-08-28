using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces.RentACar
{
    public interface ICarReservationRepository
    {
        Task<CarReservation> SetReservation(ReservationParameters rp);
    }
}
