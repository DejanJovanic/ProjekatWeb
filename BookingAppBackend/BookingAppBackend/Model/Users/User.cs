using BookingAppBackend.Model.Airlines;
using BookingAppBackend.Model.RentACar;
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
        public double Points { get; set; }
        public ICollection<FastFlight> FastFlights { get; set; } = new List<FastFlight>();
        public ICollection<Friend> MyFriends { get; set; } = new List<Friend>();
        public ICollection<PendingRequest> MyPendingRequests { get; set; } = new List<PendingRequest>();
        public ICollection<UserReservation> MyReservations { get; set; } = new List<UserReservation>();
        public ICollection<UserCarReservation> CarReservations { get; set; } = new List<UserCarReservation>();
        public User() { }
    }
}
