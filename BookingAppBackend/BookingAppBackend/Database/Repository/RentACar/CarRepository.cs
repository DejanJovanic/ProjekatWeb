﻿using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository.RentACar
{
    public class CarRepository : Repository, ICarRepository
    {
        public CarRepository(BookingAppDbContext context) : base(context) { }
        public async Task<Car> AddCar(AddCarParameters car)
        {
            var temp = await context.Enterprises.Include(i => i.Cars).FirstOrDefaultAsync(i => i.Id == car.EnterpriseId);

            var tempCar = new Car();
            tempCar.Brand = car.Brand;
            tempCar.Model = car.Model;
            tempCar.NumberOfSeats = car.NumberOfSeats;
            tempCar.Type = car.Type;
            tempCar.FuelType = car.FuelType;
            tempCar.Price = car.Price;
            tempCar.TransmissionType = car.TransmissionType;
            tempCar.YearOfProduction = car.YearOfProduction;

            temp.Cars.Add(tempCar);

            return tempCar;
        }

        public async Task<Car> DeleteCar(GetAndDeleteParameters gadp)
        {
            var car = (await context.Enterprises.Include(i => i.Cars).FirstOrDefaultAsync(enterprise => enterprise.Id == gadp.EnterpriseId)).Cars.Where(i => i.Id == gadp.ObjectId).FirstOrDefault();
            var enterprise = await context.Enterprises.Include(i => i.Cars).FirstOrDefaultAsync(i => i.Id == gadp.EnterpriseId);

            var tempCar = car;
            enterprise.Cars.Remove(car);

            return tempCar;
            
        }

        public async Task<Car> EditCar(EditCarParameters car)
        {
            var carr = (await context.Enterprises.Include(i => i.Cars).FirstOrDefaultAsync(enterprise => enterprise.Id == car.EnterpriseId)).Cars.Where(i => i.Id == car.CarId).FirstOrDefault();

            carr.Brand = car.Brand;
            carr.Model = car.Model;
            carr.NumberOfSeats = car.NumberOfSeats;
            carr.Price = car.Price;
            carr.TransmissionType = car.TransmissionType;
            carr.Type = car.Type;
            carr.YearOfProduction = car.YearOfProduction;
            carr.FuelType = car.FuelType;

            return carr;

        }

        public async Task<IEnumerable<Car>> GetAllCars(int enterpriseId)
        {
            var cars = (await context.Enterprises.Include(i => i.Cars).FirstOrDefaultAsync(enterprise => enterprise.Id == enterpriseId)).Cars.ToList();

            return cars;
        }

        public async Task<Car> GetOneCar(GetAndDeleteParameters gadp)
        {
            return (await context.Enterprises.Include(i => i.Cars).ThenInclude(i=> i.Ratings).FirstOrDefaultAsync(enterprise => enterprise.Id == gadp.EnterpriseId)).Cars.Where(i => i.Id == gadp.ObjectId).FirstOrDefault();
        }

        public async Task<Car> SetCarOnDiscount(SetDiscountParameters sdp)
        {
            var car = (await context.Enterprises.Include(i => i.Cars).ThenInclude(i => i.Discounts).FirstOrDefaultAsync(e => e.Id == sdp.EnterpriseId)).Cars.Where(i => i.Id == sdp.CarId).FirstOrDefault();

            Discount temp = new Discount();

            temp.DiscountFrom = sdp.DiscountFrom;
            temp.DiscountPercentage = sdp.Discount;
            temp.DiscountTo = sdp.DiscountTo;

            car.Discounts.Add(temp);

            return car;
        }

    }
}
