﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookingAppBackend.Model.Airlines
{
    public class PaidExtras
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Price { get; set; }

        public ICollection<FastFlightPaidExtra> FastFlights { get; set; } = new List<FastFlightPaidExtra>();
        public ICollection<TicketPaidExtra> Tickets { get; set; } = new List<TicketPaidExtra>();
    }
}
