using BookingAppBackend.Model.RentACar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses.RentACar
{
    public class CarResponse : Response<Car>
    {
        public CarResponse(Car car) : base(car) { }

        public CarResponse(string message) : base(message) { }
    }
}
