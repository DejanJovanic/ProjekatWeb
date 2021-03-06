﻿using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using BookingAppBackend.Model.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository.RentACar
{
    public class EnterpriseRepository : Repository, IEnterpriseRepository
    {
       
        public EnterpriseRepository(BookingAppDbContext context) : base(context) { }
        public async Task<Enterprise> EditEnterpriseProfile(EditEnterpriseParameters enterprise)
        {
            var enterprisee = await context.Enterprises.Include(i => i.Address).FirstOrDefaultAsync(i => i.Id == enterprise.EnterpriseId);

            enterprisee.Name = enterprise.Name;
            enterprisee.Description = enterprise.Description;
            enterprisee.Address.City = enterprise.Address.City;
            enterprisee.Address.Country = enterprise.Address.Country;
            enterprisee.Address.Street = enterprise.Address.Street;
            enterprisee.Address.StreetNo = enterprise.Address.StreetNo;
            enterprisee.Address.ZipCode = enterprise.Address.ZipCode;

            return enterprisee;

        }

        public async Task<Enterprise> AddEnterprise(EditEnterpriseParameters enterprise)
        {

            var enterprisee = new Enterprise();
            enterprisee.Address = new EnterpriseAddress();
            enterprisee.Name = enterprise.Name;
            enterprisee.Description = enterprise.Description;
            enterprisee.Address.City = enterprise.Address.City;
            enterprisee.Address.Country = enterprise.Address.Country;
            enterprisee.Address.Street = enterprise.Address.Street;
            enterprisee.Address.StreetNo = enterprise.Address.StreetNo;
            enterprisee.Address.ZipCode = enterprise.Address.ZipCode;

            context.Enterprises.Add(enterprisee);
            return enterprisee;
        }
        public async  Task<User> GetReservations(string username)
        {
            if (string.IsNullOrWhiteSpace(username)) return null;
            return await context.RegisteredUsers.Include(i => i.CarReservations).ThenInclude(i => i.SelectedCar).Include(i => i.CarReservations).ThenInclude (i => i.SelectedEnterprise).FirstOrDefaultAsync(i => i.Username.ToLower().Equals(username.ToLower()));
        }
        public async Task<IEnumerable<Enterprise>> GetAllEnterprises()
        {
            return await context.Enterprises.ToListAsync();
        }

        public async Task<Enterprise> GetEnterpriseAddress(int enterpriseId)
        {
            return await context.Enterprises.Include(i => i.Address).FirstOrDefaultAsync(i => i.Id == enterpriseId);
        }
        public async Task<IEnumerable<Enterprise>> GetAllEnterprisesForSearch()
        {
            return await context.Enterprises.Include(i => i.Cars).ThenInclude(i => i.Reservations).Include(i => i.Address).Include(i => i.Branches).ToListAsync();
        }

        public async Task<Enterprise> GetOneEnterprise(int enterpriseId)
        {
            return await context.Enterprises.Include(i=> i.Rating).Include(i => i.Address).Include(i => i.Cars).ThenInclude(i => i.Reservations).FirstOrDefaultAsync(i => i.Id == enterpriseId);
        }

        public async Task<Enterprise> GetCarsOfCompanyForRent(int enterpriseId)
        {
            return await context.Enterprises.Include(i => i.Cars).ThenInclude(i => i.Reservations).Include(i => i.Cars).ThenInclude(i => i.Discounts).Include(i => i.Address).Include(i => i.Branches).FirstOrDefaultAsync(i => i.Id == enterpriseId);
        }

        public async Task<Enterprise> GetCarsOnDiscount(int enterpriseId)
        {
            return await context.Enterprises.Include(i => i.Cars).ThenInclude(i => i.Discounts).Include(i => i.Cars).ThenInclude(i => i.Ratings).FirstOrDefaultAsync(i => i.Id == enterpriseId);
        }

    }
}
