using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.Cars
{
    public class CarService : ICarService
    {
        private ICarRepository repo;
        private IEnterpriseRepository repo2;
        private ISpecialOfferRepository repo3;
        private IUnitOfWork unitOfWork;

        public CarService(IEnterpriseRepository ep, ICarRepository repo, ISpecialOfferRepository aaa, IUnitOfWork unitOfWork)
        {
            this.repo2 = ep;
            this.repo = repo;
            this.unitOfWork = unitOfWork;
            this.repo3 = aaa;
        }
        public async Task<Car> AddCar(AddCarParameters car)
        {
            try
            {
                var temp = await repo.AddCar(car);
                if(temp != null)
                {
                    await unitOfWork.CompleteAsync();
                }
                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Car> DeleteCar(int enterpriseId, int carId)
        {
            try
            {
                var temp = await repo.DeleteCar(enterpriseId, carId);
                if (temp != null)
                {
                    await unitOfWork.CompleteAsync();
                }
                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Car> EditCar(EditCarParameters car)
        {
            try
            {
                var temp = await repo.EditCar(car);
                if (temp != null)
                {
                    await unitOfWork.CompleteAsync();
                }
                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<IEnumerable<Car>> GetAllCars(int enterpriseId)
        {
            try
            {
                var temp = await repo.GetAllCars(enterpriseId);
                return temp;

            }
            catch
            {
                return null;
            }
        }

        public async Task<Car> GetOneCar(int enterpriseId, int carId)
        {
            try
            {
                var temp = await repo.GetOneCar(enterpriseId, carId);
               
                return temp;
            }
            catch
            {
                return null;
            }
        }

        //Our cars u HTML
        public async Task<IEnumerable<Car>> SearchAllCars(SearchCarParameters scp)
        {
            var temp = await repo.GetAllCars(scp.EnterpriseId);

            List<Car> retValue = new List<Car>();

            foreach(var car in temp)
            {
                if(scp.PriceFrom != "" && scp.PriceFrom != null)
                {
                    if (Int32.Parse(scp.PriceFrom) > car.Price)
                        continue;
                }

                if(scp.PriceTo != "" && scp.PriceTo != null)
                {
                    if (Int32.Parse(scp.PriceTo) < car.Price)
                        continue;
                }

                if(scp.YearOfProductionFrom != "" && scp.YearOfProductionFrom != null)
                {
                    if (Int32.Parse(scp.YearOfProductionFrom) > car.YearOfProduction)
                        continue;
                }

                if(scp.YearOfProductionTo != "" && scp.YearOfProductionTo != null)
                {
                    if (Int32.Parse(scp.YearOfProductionTo) < car.YearOfProduction)
                        continue;
                }

                if(scp.NumberOfSeats != "" && scp.NumberOfSeats != null)
                {
                    if (Int32.Parse(scp.NumberOfSeats) != car.NumberOfSeats)
                        continue;
                }

                if(scp.FuelType != "" && scp.FuelType != null)
                {
                    if (scp.FuelType.ToLower() != car.FuelType.ToLower())
                        continue;
                }

                if(scp.TransmissionType != "" && scp.TransmissionType != null)
                {
                    if (scp.TransmissionType.ToLower() != car.TransmissionType.ToLower())
                        continue;
                }

                if(scp.Brand != "" && scp.Brand != null)
                {
                    if (scp.Brand.ToLower() != car.Brand.ToLower())
                        continue;
                }

                if(scp.Type != "" && scp.Type != null)
                {
                    if (scp.Type.ToLower() != car.Type.ToLower())
                        continue;
                }

                if(scp.Model != "" && scp.Model != null)
                {
                    if (scp.Model.ToLower() != car.Model.ToLower())
                        continue;
                }

                retValue.Add(car);
            }

            return retValue;
        }

        //Rent a car u HTML
        public async Task<IEnumerable<Car>> SearchCarsForRent(SearchCarsForRentParameters scfrp)
        {
            var temp = await repo2.GetCarsOfCompanyForRent(scfrp.EnterpriseId);
            
            List<Car> retValue = new List<Car>();

            bool enterpriseLocationFrom = false;
            bool enterpriseLocationTo = false;
            bool branchLocationFrom = false;
            bool branchLocationTo = false;
            bool rented = false;
           
            if (temp.Address.City.ToLower() == scfrp.PickUpPlace.ToLower())
                enterpriseLocationFrom = true;

            if (temp.Address.City.ToLower() == scfrp.ReturnPlace.ToLower())
                enterpriseLocationTo = true;

            foreach(var branch in temp.Branches)
            {
                if (branch.City.ToLower() == scfrp.PickUpPlace.ToLower())
                    branchLocationFrom = true;

                if (branch.City.ToLower() == scfrp.ReturnPlace.ToLower())
                    branchLocationTo = true;
            }

            if((branchLocationFrom == true || enterpriseLocationFrom == true) && (branchLocationTo == true || enterpriseLocationTo == true))
            {
                foreach(var car in temp.Cars)
                {
                    if (car.Type.ToLower() != scfrp.CarType.ToLower() || Int32.Parse(scfrp.NumberOfpassengers) > car.NumberOfSeats)
                        continue;

                    foreach(var reservation in car.Reservations)
                    {
                        if (reservation.DateFrom >= scfrp.DateFrom && reservation.DateTo <= scfrp.DateTo)
                            rented = true;
                    }

                    if (rented)
                    {
                        rented = false;
                        continue;
                    }

                    if(scfrp.PriceFrom != "" && scfrp.PriceFrom != null)
                    {
                        if (Int32.Parse(scfrp.PriceFrom) > car.Price)
                            continue;
                    }

                    if(scfrp.PriceTo != "" && scfrp.PriceTo != null)
                    {
                        if (Int32.Parse(scfrp.PriceTo) < car.Price)
                            continue;
                    }

                    if (car.Discounts.Count() != 0)
                    {
                        foreach (var discountPeriod in car.Discounts)
                        {
                            if ((DateTime.Today < discountPeriod.DiscountFrom) || (DateTime.Today > discountPeriod.DiscountTo))
                            {
                                retValue.Add(car);
                            }

                        }
                    }
                    else
                        retValue.Add(car);

                }
                
               
            }
            

            return retValue;
        }

        public async Task<IEnumerable<Car>> GetCarsOnDiscount(int enterpriseId)
        {
            var temp = await repo2.GetCarsOnDiscount(enterpriseId);
            List<Car> retVal = new List<Car>();

            foreach(var car in temp.Cars)
            {
                foreach(var discountPeriod in car.Discounts)
                {
                    if ((DateTime.Today >= discountPeriod.DiscountFrom) && (DateTime.Today <= discountPeriod.DiscountTo))
                    {
                        retVal.Add(car);
                    }
                }
            }
            return retVal;
        }

        public async Task<Car> SetCarOnDiscount(SetDiscountParameters sdp)
        {
            try
            {
                var temp = await repo.SetCarOnDiscount(sdp);
                if (temp != null)
                {
                    await unitOfWork.CompleteAsync();
                }
                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<CarReservation> CreateReservation(ReservationParameters paramss)
        {
            var enterprise = await repo2.GetOneEnterprise(paramss.EnterpriseId);
            var car = await repo.GetOneCar(paramss.EnterpriseId, paramss.CarId);
            var specialOfferss = await repo3.GetAllSpecialOffers(paramss.EnterpriseId);

            
            int numberOfDays = (paramss.DateTo - paramss.DateFrom).Days + 1;

            int price = numberOfDays * car.Price;

            CarReservation retValue = new CarReservation();
            retValue.IsRated = false;
            retValue.NumberOfDays = numberOfDays;
            retValue.SelectedCar = car;
            retValue.SelectedEnterprise = enterprise;
            retValue.DateFrom = paramss.DateFrom;
            retValue.DateTo = paramss.DateTo;
            bool found = false;
            List<SpecialOffer> specialOffers = specialOfferss.OrderBy(i => i.NumberOfDays).ToList();
            for(int i = 0; i < specialOffers.Count()-2; i++)
            {
                if (!found)
                {
                    if(numberOfDays == specialOffers[i].NumberOfDays)
                    {
                        retValue.RealizedPackage = specialOffers[i];
                        break;
                    }
                }
                for(int j = i+1; j <= specialOffers.Count()-1; j++)
                {
                    if(numberOfDays > specialOffers[i].NumberOfDays && numberOfDays < specialOffers[j].NumberOfDays)
                    {
                        retValue.RealizedPackage = specialOffers[i];
                        found = true;
                        break;
                    }
                    else if(numberOfDays == specialOffers[j].NumberOfDays)
                    {
                        retValue.RealizedPackage = specialOffers[j];
                        found = true;
                        break;
                    }
                    else if(numberOfDays > specialOffers[i].NumberOfDays && numberOfDays >= specialOffers[j].NumberOfDays)
                    {
                        retValue.RealizedPackage = specialOffers[j];
                        found = true;
                        break;
                    }
                }
            }

            if(retValue.RealizedPackage != null) { 
                price = price - ((price * retValue.RealizedPackage.Discount) / 100);
                retValue.Price = price;
            }
            else
                retValue.Price = price;
            

            return retValue;
        }
    }
}
