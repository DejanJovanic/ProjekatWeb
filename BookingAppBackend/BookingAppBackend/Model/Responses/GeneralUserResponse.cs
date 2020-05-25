using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses
{
    public class GeneralUserResponse : Response<(object Item, string Role)>
    {
        public GeneralUserResponse((object Item, string Role) item) : base(item) { }

        public GeneralUserResponse(string errorMessage) : base(errorMessage) { }
    }
}
