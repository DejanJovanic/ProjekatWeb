using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.Enterprises
{
    public interface IEnterpriseService
    {
        Task<IEnumerable<Enterprise>> GetAllEnterprises();
        Task<Enterprise> GetOneEnterprise(int enterpriseId);
        Task<Enterprise> EditEnterpriseProfile(EditEnterpriseParameters enterprise);

        Task<IEnumerable<Enterprise>> SearchEnterprises(SearchEnterpriseParameters sep);
        Task<EnterpriseAddress> GetEnterpriseAddress(int enterpriseId);
        Task<RatingParameters> SetRating(RatingParameters rating);
        Task<Enterprise> AddEnterprise(EditEnterpriseParameters enterprise);
    }
}
