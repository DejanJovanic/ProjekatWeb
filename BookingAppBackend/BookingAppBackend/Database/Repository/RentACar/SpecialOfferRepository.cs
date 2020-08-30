using BookingAppBackend.Database.Contex;
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
    public class SpecialOfferRepository : Repository, ISpecialOfferRepository
    {
        public SpecialOfferRepository(BookingAppDbContext context) : base(context) { }
        public async Task<SpecialOffer> AddSpecialOffer(AddSpecialOfferParameters specialOffer)
        {
            var temp = await context.Enterprises.Include(i => i.SpecialOffers).FirstOrDefaultAsync(i => i.Id == specialOffer.EnterpriseId);

            var tempSpecialOffer = new SpecialOffer();
            tempSpecialOffer.Name = specialOffer.Name;
            tempSpecialOffer.Description = specialOffer.Description;
            tempSpecialOffer.Discount = Int32.Parse(specialOffer.Discount);
            tempSpecialOffer.NumberOfDays = Int32.Parse(specialOffer.NumberOfDays);

            temp.SpecialOffers.Add(tempSpecialOffer);

            return tempSpecialOffer;
        }

        public async Task<SpecialOffer> DeleteSpecialOffer(int enterpriseId, int specialOfferId)
        {
            var specialOffer = (await context.Enterprises.Include(i => i.SpecialOffers).FirstOrDefaultAsync(enterprise => enterprise.Id == enterpriseId)).SpecialOffers.Where(i => i.Id == specialOfferId).FirstOrDefault();
            var enterprise = await context.Enterprises.Include(i => i.SpecialOffers).FirstOrDefaultAsync(i => i.Id == enterpriseId);

            var tempSpecialOffer = specialOffer;
            enterprise.SpecialOffers.Remove(specialOffer);

            return tempSpecialOffer;
        }

        public async Task<SpecialOffer> EditSpecialOffer(EditSpecialOfferParameters specialOffer)
        {
            var specialOfferr = (await context.Enterprises.Include(i => i.SpecialOffers).FirstOrDefaultAsync(enterprise => enterprise.Id == specialOffer.EnterpriseId)).SpecialOffers.Where(i => i.Id == specialOffer.SpecialOfferId).FirstOrDefault();
            
            specialOfferr.Name = specialOffer.Name;
            specialOfferr.Description = specialOffer.Description;
            specialOfferr.Discount = Int32.Parse(specialOffer.Discount);
            specialOfferr.NumberOfDays = Int32.Parse(specialOffer.NumberOfDays);
            
            return specialOfferr;
        }

        public async Task<IEnumerable<SpecialOffer>> GetAllSpecialOffers(int enterpriseId)
        {
            var specialOffers = (await context.Enterprises.Include(i => i.SpecialOffers).FirstOrDefaultAsync(enterprise => enterprise.Id == enterpriseId)).SpecialOffers.ToList();

            return specialOffers;
        }

        public async Task<SpecialOffer> GetOneSpecialOffer(int enterpriseId, int specialOfferId)
        {
            return (await context.Enterprises.Include(i => i.SpecialOffers).FirstOrDefaultAsync(enterprise => enterprise.Id == enterpriseId)).SpecialOffers.Where(i => i.Id == specialOfferId).FirstOrDefault();
        }
    }
}
