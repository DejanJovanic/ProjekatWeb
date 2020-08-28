using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces.RentACar
{
    public interface ISpecialOfferRepository
    {
        Task<IEnumerable<SpecialOffer>> GetAllSpecialOffers(int enterpriseId);
        Task<SpecialOffer> GetOneSpecialOffer(GetAndDeleteParameters gadp);
        Task<SpecialOffer> AddSpecialOffer(AddSpecialOfferParameters specialOffer);
        Task<SpecialOffer> EditSpecialOffer(EditSpecialOfferParameters specialOffer);
        Task<SpecialOffer> DeleteSpecialOffer(GetAndDeleteParameters gadp);
    }
}
