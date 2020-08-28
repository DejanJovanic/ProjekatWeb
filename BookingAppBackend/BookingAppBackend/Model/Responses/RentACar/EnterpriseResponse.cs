using BookingAppBackend.Model.RentACar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses.RentACar
{
    public class EnterpriseResponse : Response<Enterprise>
    {
        public EnterpriseResponse(Enterprise e) : base(e) { }

        public EnterpriseResponse(string message) : base(message) { }
    }
}
