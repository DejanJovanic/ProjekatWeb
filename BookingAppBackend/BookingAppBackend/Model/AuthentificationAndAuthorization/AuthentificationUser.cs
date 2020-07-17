using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.AuthentificationAndAuthorization
{
    public class AuthentificationUser : IdentityUser
    {
        public AuthentificationUser() : base() { }

        public AuthentificationUser(string username) : base(username) { }
    }
}
