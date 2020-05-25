﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class Airline
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public AirlineAddress Address { get; set; }
        public string Description { get; set; }
        public ICollection<string> Destinations { get; set; } = new List<string>();
        public ICollection<Airplane> Airplanes { get; set; } = new List<Airplane>();
        public ICollection<Flight> Flights { get; set; } = new List<Flight>();
        public ICollection<FastFlight> FastFlights { get; set; } = new List<FastFlight>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();

    }
}
