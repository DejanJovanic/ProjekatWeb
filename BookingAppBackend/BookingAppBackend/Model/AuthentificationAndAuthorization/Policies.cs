﻿using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.AuthentificationAndAuthorization
{
    public class Policies
    {
        public const string AirlineAdmin = "AirlineAdmin";
            
        public const string User = "User";

        public static AuthorizationPolicy AirlineAdminPolicy() => new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(AirlineAdmin).Build();

        public static AuthorizationPolicy UserPolicy() => new AuthorizationPolicyBuilder().RequireAuthenticatedUser().RequireRole(User).Build();

    }
}