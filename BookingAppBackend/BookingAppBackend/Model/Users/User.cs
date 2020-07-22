using BookingAppBackend.Model.Airlines;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Users
{
    public class User
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public bool IsEnabled { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public ICollection<User> Friends { get; set; } = new List<User>();
        public ICollection<User> PendingRequests { get; set; } = new List<User>();
        public ICollection<UserReservation> MyReservations { get; set; } = new List<UserReservation>();
        public User() { }
    }
}
