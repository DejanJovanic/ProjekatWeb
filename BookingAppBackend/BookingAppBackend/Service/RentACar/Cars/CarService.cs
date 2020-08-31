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

        public async Task<Car> GetOneCarOnDiscount(int enterpriseId, int carId)
        {
           
         var temp = await repo.GetOneCarOnDiscount(enterpriseId, carId);

            foreach(var discount in temp.Discounts.ToList())
            {
                if (DateTime.Now > discount.DiscountTo)
                    temp.Discounts.Remove(discount);
            }

            return temp;
              
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
            List<DateTime> datesBetween2 = new List<DateTime>();
            for (var date = scfrp.DateFrom; date <= scfrp.DateTo; date = date.AddDays(1))
                datesBetween2.Add(date);

            bool enterpriseLocationFrom = false;
            bool enterpriseLocationTo = false;
            bool branchLocationFrom = false;
            bool branchLocationTo = false;
            bool rented = false;
            bool found = false;
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
                    List<DateTime> datesBetween = new List<DateTime>();
                    foreach(var res in car.Reservations)
                    {
                        for (var date = res.DateFrom; date <= res.DateTo; date = date.AddDays(1))
                            datesBetween.Add(date);
                    }
                    if (car.Type.ToLower() != scfrp.CarType.ToLower() || Int32.Parse(scfrp.NumberOfpassengers) > car.NumberOfSeats)
                        continue;

                    foreach(var date in datesBetween)
                    {
                        foreach(var date2 in datesBetween2) { 
                        if (date2 == date)
                            rented = true;
                        }
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
                        List<DateTime> datesBetween3 = new List<DateTime>();
                        foreach (var res in car.Discounts)
                        {
                            for (var date = res.DiscountFrom; date <= res.DiscountTo; date = date.AddDays(1))
                                datesBetween3.Add(date);
                        }
                        foreach (var date1 in datesBetween3)
                        {
                            foreach(var date2 in datesBetween2) 
                            {
                                if (date1 != date2)
                                    found = true;
                                
                               
                            }

                        }
                        if (found) { 
                            retValue.Add(car);
                            found = false;
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
                List<string> datesBetween = new List<string>();
                foreach (var discountPeriod in car.Discounts)
                {
                    for (var date = discountPeriod.DiscountFrom; date <= discountPeriod.DiscountTo; date = date.AddDays(1))
                        datesBetween.Add(date.ToShortDateString());
                }

                foreach (var a in datesBetween)
                {
                    if (DateTime.Now.ToShortDateString() == a)
                    {
                        retVal.Add(car);
                        break;
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
            retValue.RentedDay = paramss.RentedDay;
            List<SpecialOffer> specialOffers = specialOfferss.OrderBy(i => i.NumberOfDays).ToList();
            for(int i = 0; i < specialOffers.Count()-2; i++)
            {
                
                    if(numberOfDays == specialOffers[i].NumberOfDays)
                         retValue.RealizedPackage = specialOffers[i];
                    
                for(int j = i+1; j <= specialOffers.Count()-1; j++)
                {
                    if(numberOfDays > specialOffers[i].NumberOfDays && numberOfDays < specialOffers[j].NumberOfDays)
                        retValue.RealizedPackage = specialOffers[i];
                      
                    else if(numberOfDays == specialOffers[j].NumberOfDays)
                        retValue.RealizedPackage = specialOffers[j];
                       
                    else if(numberOfDays > specialOffers[i].NumberOfDays && numberOfDays >= specialOffers[j].NumberOfDays)
                        retValue.RealizedPackage = specialOffers[j];
                      
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

        public async Task<ReservationCar> SetReservation(CarReservation parameters)
        {
            
            var car = await repo.GetOneCar(parameters.SelectedEnterprise.Id, parameters.SelectedCar.Id);

            var temp = new ReservationCar();
            temp.IsRated = parameters.IsRated;
            temp.NumberOfDays = parameters.NumberOfDays;
            temp.Price = parameters.Price;
          
            temp.RealizedPackage = parameters.RealizedPackage;
            temp.DateTo = parameters.DateTo;
            temp.DateFrom = parameters.DateFrom;
            temp.RentedDay = parameters.RentedDay;
            car.Reservations.Add(temp);
            try
            {
               await unitOfWork.CompleteAsync();
            }
            catch
            {
                return null;
            }

            return temp;
        }

        public async Task<ReservationCar> SetReservationForDiscount(CarReservation parameters)
        {

            var car = await repo.GetOneCar(parameters.SelectedEnterprise.Id, parameters.SelectedCar.Id);

            var temp = new ReservationCar();
            temp.IsRated = parameters.IsRated;
            temp.NumberOfDays = parameters.NumberOfDays;
            temp.Price = parameters.Price;

            temp.RealizedPackage = parameters.RealizedPackage;
            temp.DateTo = parameters.DateTo;
            temp.DateFrom = parameters.DateFrom;
            temp.RentedDay = parameters.RentedDay;
          

            foreach(var discount in car.Discounts.ToList())
            {
                if (temp.DateFrom == discount.DiscountFrom && temp.DateTo == discount.DiscountTo)
                    car.Discounts.Remove(discount);
            }

            car.Reservations.Add(temp);
            try
            {
                await unitOfWork.CompleteAsync();
            }
            catch
            {
                return null;
            }

            return temp;
        }

        public async Task<CarReservation> CreateReservationForCarOnDiscount(DiscountDetails paramss)
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
            retValue.RentedDay = paramss.RentedDay;
            List<SpecialOffer> specialOffers = specialOfferss.OrderBy(i => i.NumberOfDays).ToList();
            for (int i = 0; i < specialOffers.Count() - 2; i++)
            {

                if (numberOfDays == specialOffers[i].NumberOfDays)
                    retValue.RealizedPackage = specialOffers[i];

                for (int j = i + 1; j <= specialOffers.Count() - 1; j++)
                {
                    if (numberOfDays > specialOffers[i].NumberOfDays && numberOfDays < specialOffers[j].NumberOfDays)
                        retValue.RealizedPackage = specialOffers[i];

                    else if (numberOfDays == specialOffers[j].NumberOfDays)
                        retValue.RealizedPackage = specialOffers[j];

                    else if (numberOfDays > specialOffers[i].NumberOfDays && numberOfDays >= specialOffers[j].NumberOfDays)
                        retValue.RealizedPackage = specialOffers[j];

                }
            }

            if (retValue.RealizedPackage != null)
            {
                price = price - ((price * retValue.RealizedPackage.Discount) / 100);
                retValue.Price = price - ((price * paramss.Percentage) / 100);
            }
            else { 
                retValue.Price = price - ((price * paramss.Percentage) / 100);
            }


            return retValue;
        }
    }
}
