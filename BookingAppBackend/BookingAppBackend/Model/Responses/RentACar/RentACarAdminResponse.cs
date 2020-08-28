using BookingAppBackend.Model.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses.RentACar
{
    public class RentACarAdminResponse : Response<RentACarAdmin>
    {
        public RentACarAdminResponse(RentACarAdmin re) : base(re) { }

        public RentACarAdminResponse(string message) : base(message) { }
    }
}
