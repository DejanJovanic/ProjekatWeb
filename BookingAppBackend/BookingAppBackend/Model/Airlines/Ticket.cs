﻿using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Airlines
{
    public class Ticket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public double Price { get; set; }
        public Flight Flight { get; set; }
        public User TicketOwner { get; set; }
        public ICollection<PaidExtras> SelectedExtras { get; set; } = new List<PaidExtras>();
        public double LoadWeight { get; set; }
        public User InvitedBy { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Passport { get; set; }
        public bool IsApporved { get; set; }
    }
}
