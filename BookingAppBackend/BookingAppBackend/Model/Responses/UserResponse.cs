using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class UserResponse : Response<User>
    {
        public UserResponse(User user) : base(user) { }

        public UserResponse(string errorMessage) : base(errorMessage) { }
    }
}
