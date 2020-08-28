using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.Cars
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetAllCars(int enterpriseId);
        Task<Car> GetOneCar(GetAndDeleteParameters gadp);
        Task<Car> AddCar(AddCarParameters car);
        Task<Car> EditCar(EditCarParameters car);
        Task<Car> DeleteCar(GetAndDeleteParameters gadp);
        Task<IEnumerable<Car>> SearchAllCars(SearchCarParameters scp);
        Task<IEnumerable<Car>> SearchCarsForRent(SearchCarsForRentParameters scfrp);
        Task<IEnumerable<Car>> GetCarsOnDiscount(int enterpriseId);
        Task<Car> SetCarOnDiscount(SetDiscountParameters sdp);
    }
}
