using BookingAppBackend.Model.RentACar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses.RentACar
{
    public class SpecialOfferResponse : Response<SpecialOffer>
    {
        public SpecialOfferResponse(SpecialOffer so) : base(so) { }

        public SpecialOfferResponse(string message) : base(message) { }
    }
}
