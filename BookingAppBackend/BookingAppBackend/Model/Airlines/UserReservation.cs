using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class UserReservation
    {
        public string Username { get; set; }
        public int ReservationId { get; set; }
        public virtual User User { get; set; }
        public virtual Reservation Reservation { get; set; }
    }
}
