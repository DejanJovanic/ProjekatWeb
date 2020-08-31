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
        Task<Car> GetOneCar(int enterpriseId, int carId);
        Task<Car> AddCar(AddCarParameters car);
        Task<Car> EditCar(EditCarParameters car);
        Task<Car> DeleteCar(int enterpriseId, int carId);
        Task<IEnumerable<Car>> SearchAllCars(SearchCarParameters scp);
        Task<IEnumerable<Car>> SearchCarsForRent(SearchCarsForRentParameters scfrp);
        Task<IEnumerable<Car>> GetCarsOnDiscount(int enterpriseId);
        Task<Car> SetCarOnDiscount(SetDiscountParameters sdp);
        Task<CarReservation> CreateReservation(ReservationParameters paramss);
        Task<ReservationCar> SetReservation(CarReservation parameters);
        Task<Car> GetOneCarOnDiscount(int enterpriseId, int carId);
        Task<CarReservation> CreateReservationForCarOnDiscount(DiscountDetails paramss);
        Task<ReservationCar> SetReservationForDiscount(CarReservation parameters);
    }
}
