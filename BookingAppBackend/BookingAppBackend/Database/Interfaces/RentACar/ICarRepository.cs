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
        Task <Car> GetOneCar(int enterpriseId, int carId);
        Task <Car> AddCar(AddCarParameters car);
        Task <Car> EditCar(EditCarParameters car);
        Task <Car> DeleteCar(int enterpriseId, int carId);
        Task<Car> SetCarOnDiscount(SetDiscountParameters sdp);
        Task<Car> GetOneCarOnDiscount(int enterpriseId, int carId);

    }
}
