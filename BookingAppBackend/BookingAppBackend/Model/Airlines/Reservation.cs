using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class Reservation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public User SettingUser { get; set; }
        public ICollection<Ticket> AirlineTickets { get; set; } = new List<Ticket>();

        public ICollection<UserReservation> Users { get; set; } = new List<UserReservation>();
        
    }
}
