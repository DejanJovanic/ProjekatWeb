using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.SpecialOffers
{
    public class SpecialOfferService : ISpecialOfferService
    {
        private ISpecialOfferRepository repo;
        private IUnitOfWork unitOfWork;

        public SpecialOfferService(ISpecialOfferRepository repo, IUnitOfWork unitOfWork)
        {

            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }
        public async Task<SpecialOffer> AddSpecialOffer(AddSpecialOfferParameters specialOffer)
        {
            try
            {
                var temp = await repo.AddSpecialOffer(specialOffer);
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

        public async Task<SpecialOffer> DeleteSpecialOffer(GetAndDeleteParameters gadp)
        {
            try
            {
                var temp = await repo.DeleteSpecialOffer(gadp);
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

        public async Task<SpecialOffer> EditSpecialOffer(EditSpecialOfferParameters specialOffer)
        {
            try
            {
                var temp = await repo.EditSpecialOffer(specialOffer);
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

        public async Task<IEnumerable<SpecialOffer>> GetAllSpecialOffers(int enterpriseId)
        {
            try
            {
                var temp = await repo.GetAllSpecialOffers(enterpriseId);
               
                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<SpecialOffer> GetOneSpecialOffer(GetAndDeleteParameters gadp)
        {
            try
            {
                var temp = await repo.GetOneSpecialOffer(gadp);
                
                return temp;
            }
            catch
            {
                return null;
            }
        }
    }
}
