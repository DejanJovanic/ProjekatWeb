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
        private IUnitOfWork unitOfWork;

        public EnterpriseService(IEnterpriseRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
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
            
            foreach (var enterprise in temp)
            {
                if(sep.EnterpriseName != "" || sep.EnterpriseName != null)
                {
                    if(enterprise.Name == sep.EnterpriseName || enterprise.Name.ToLower() == sep.EnterpriseName.ToLower())
                    {
                        if(sep.BranchLocation != "" || sep.BranchLocation != null)
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
                                    foreach (var reservation in car.Reservations)
                                    {
                                        if (reservation.DateFrom >= sep.RentFrom && reservation.DateTo <= sep.RentTo)
                                            rented = true;
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
                                foreach (var reservation in car.Reservations)
                                {
                                    if (reservation.DateFrom >= sep.RentFrom && reservation.DateTo <= sep.RentTo)
                                        rented = true;
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
                        if (sep.BranchLocation != "" || sep.BranchLocation != null)
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
                                    foreach (var reservation in car.Reservations)
                                    {
                                        if (reservation.DateFrom >= sep.RentFrom && reservation.DateTo <= sep.RentTo)
                                            rented = true;
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
                                foreach (var reservation in car.Reservations)
                                {
                                    if (reservation.DateFrom >= sep.RentFrom && reservation.DateTo <= sep.RentTo)
                                        rented = true;
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
            }

            return retValue;

        }
    }
}
