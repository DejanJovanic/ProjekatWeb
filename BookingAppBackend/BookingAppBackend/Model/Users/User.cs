﻿using Microsoft.AspNetCore.Identity;
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
        public string Role { get; set; }
        public string Password { get; set; }
        public ICollection<User> Friends { get; set; } = new List<User>();
        public ICollection<User> PendingRequests { get; set; } = new List<User>();
        public User() { }
    }
}
