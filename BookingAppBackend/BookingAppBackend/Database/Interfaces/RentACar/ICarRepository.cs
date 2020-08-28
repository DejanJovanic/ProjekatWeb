using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Model.Responses.RentACar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces.RentACar
{
    public interface ICarRepository
    {

        Task<IEnumerable<Car>> GetAllCars(int enterpriseId);
        Task <Car> GetOneCar(GetAndDeleteParameters gadp);
        Task <Car> AddCar(AddCarParameters car);
        Task <Car> EditCar(EditCarParameters car);
        Task <Car> DeleteCar(GetAndDeleteParameters gadp);
        Task<Car> SetCarOnDiscount(SetDiscountParameters sdp);


    }
}
