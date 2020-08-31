using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using Microsoft.AspNetCore.Components.RenderTree;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.ValueGeneration.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.Enterprises
{
    public class EnterpriseService : IEnterpriseService
    {
        private IEnterpriseRepository repo;
        private ICarRepository repo2;
        private IUnitOfWork unitOfWork;

        public EnterpriseService(IEnterpriseRepository repo, IUnitOfWork unitOfWork, ICarRepository repo2)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
            this.repo2 = repo2;
        }
        public async Task<Enterprise> EditEnterpriseProfile(EditEnterpriseParameters enterprise)
        {
            try
            {
                var temp = await repo.EditEnterpriseProfile(enterprise);
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

        public async Task<Enterprise> AddEnterprise(EditEnterpriseParameters enterprise)
        {
            try
            {
                var temp = await repo.AddEnterprise(enterprise);
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
        public async Task<IEnumerable<Enterprise>> GetAllEnterprises()
        {
            try
            {
                var temp = await repo.GetAllEnterprises();
               
                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<EnterpriseAddress> GetEnterpriseAddress(int enterpriseId)
        {
            try
            {
                var temp = await repo.GetEnterpriseAddress(enterpriseId);

                return temp.Address;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Enterprise> GetOneEnterprise(int enterpriseId)
        {
            try
            {
                var temp = await repo.GetOneEnterprise(enterpriseId);
               
                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<IEnumerable<Enterprise>> SearchEnterprises(SearchEnterpriseParameters sep)
        {
            var temp = await repo.GetAllEnterprisesForSearch();
            List<Enterprise> retValue = new List<Enterprise>();
            bool rented = false;
            List<DateTime> datesBetween2 = new List<DateTime>();
            for (var date = sep.RentFrom; date <= sep.RentTo; date = date.AddDays(1))
                datesBetween2.Add(date);
            foreach (var enterprise in temp)
            {
                if(sep.EnterpriseName != "" && sep.EnterpriseName != null)
                {
                    if(enterprise.Name == sep.EnterpriseName || enterprise.Name.ToLower() == sep.EnterpriseName.ToLower())
                    {
                        if(sep.BranchLocation != "" && sep.BranchLocation != null)
                        {
                            var found = 0;
                            foreach (var branch in enterprise.Branches)
                            {
                                if (branch.City.ToLower() == sep.BranchLocation.ToLower() || enterprise.Address.City.ToLower() == sep.BranchLocation.ToLower())
                                {
                                    found++;
                                    break;
                                }
                            }
                            if (found != 0)
                            {
                                foreach (var car in enterprise.Cars)
                                {
                                    List<DateTime> datesBetween = new List<DateTime>();

                                    foreach(var reservation in car.Reservations)
                                    {
                                        for (var date = reservation.DateFrom; date <= reservation.DateTo; date = date.AddDays(1))
                                            datesBetween.Add(date);
                                    }

                                    foreach(var date1 in datesBetween)
                                    {
                                        foreach(var date2 in datesBetween2)
                                        {
                                            if (date1 == date2)
                                                rented = true;
                                        }
                                    }
                                   

                                    if (rented)
                                    {
                                        rented = false;
                                        continue;
                                    }
                                    else
                                    {
                                        retValue.Add(enterprise);
                                        break;
                                    }
                                }
                            }

                        }
                        else
                        {
                            foreach (var car in enterprise.Cars)
                            {
                                List<DateTime> datesBetween = new List<DateTime>();

                                foreach (var reservation in car.Reservations)
                                {
                                    for (var date = reservation.DateFrom; date <= reservation.DateTo; date = date.AddDays(1))
                                        datesBetween.Add(date);
                                }

                                foreach (var date1 in datesBetween)
                                {
                                    foreach (var date2 in datesBetween2)
                                    {
                                        if (date1 == date2)
                                            rented = true;
                                    }
                                }

                                if (rented)
                                {
                                    rented = false;
                                    continue;
                                }
                                else
                                {
                                    retValue.Add(enterprise);
                                    break;
                                }
                            }
                        }
                    }
                    
                }
                else if(sep.BranchLocation != "" && sep.BranchLocation != null)
                {
                    var found = 0;
                    foreach (var branch in enterprise.Branches)
                    {
                        if (branch.City.ToLower() == sep.BranchLocation.ToLower() || enterprise.Address.City.ToLower() == sep.BranchLocation.ToLower())
                        {
                            found++;
                            break;
                        }
                    }
                    if (found != 0)
                    {
                        foreach (var car in enterprise.Cars)
                        {
                            List<DateTime> datesBetween = new List<DateTime>();

                            foreach (var reservation in car.Reservations)
                            {
                                for (var date = reservation.DateFrom; date <= reservation.DateTo; date = date.AddDays(1))
                                    datesBetween.Add(date);
                            }

                            foreach (var date1 in datesBetween)
                            {
                                foreach (var date2 in datesBetween2)
                                {
                                    if (date1 == date2)
                                        rented = true;
                                }
                            }

                            if (rented)
                            {
                                rented = false;
                                continue;
                            }
                            else
                            {
                                retValue.Add(enterprise);
                                break;
                            }
                        }
                    }
                }
                else
                {
                    foreach (var car in enterprise.Cars)
                    {
                        List<DateTime> datesBetween = new List<DateTime>();

                        foreach (var reservation in car.Reservations)
                        {
                            for (var date = reservation.DateFrom; date <= reservation.DateTo; date = date.AddDays(1))
                                datesBetween.Add(date);
                        }

                        foreach (var date1 in datesBetween)
                        {
                            foreach (var date2 in datesBetween2)
                            {
                                if (date1 == date2)
                                    rented = true;
                            }
                        }

                        if (rented)
                         {
                            rented = false;
                            continue;
                         }
                         else
                         {
                            retValue.Add(enterprise);
                            break;
                         }
                    }
                }
            }

            return retValue;

        }

        public async Task<RatingParameters> SetRating(RatingParameters rating)
        {
            var temp = await repo.GetOneEnterprise(rating.EnterpriseId);
            var car = await repo2.GetOneCar(rating.EnterpriseId, rating.CarId);

            var rating1 = new EnterpriseRating();
            var rating2 = new CarRating();
            rating1.Rating = rating.EnterpriseRating;
            rating2.Rating = rating.CarRating;

            temp.Rating.Add(rating1);
            car.Ratings.Add(rating2);
            try
            {
                await unitOfWork.CompleteAsync(); 

                
            }
            catch
            {
                return null;
            }

            return rating;

        }

        public async Task<BookingAppBackend.Model.Users.User> GetReservations(string username)
        {
            try
            {
                var temp = await repo.GetReservations(username);

                return temp;
            }
            catch
            {
                return null;
            }
        }
    }
}
