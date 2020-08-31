using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces.RentACar
{
    public interface IEnterpriseRepository
    {
        Task<IEnumerable<Enterprise>> GetAllEnterprises();
        Task<Enterprise> GetOneEnterprise(int enterpriseId);
        Task<Enterprise> EditEnterpriseProfile(EditEnterpriseParameters enterprise);
        Task<IEnumerable<Enterprise>> GetAllEnterprisesForSearch();

        Task<Enterprise> GetCarsOfCompanyForRent(int enterpriseId);
        Task<Enterprise> GetCarsOnDiscount(int enterpriseId);
        Task<Enterprise> GetEnterpriseAddress(int enterpriseId);
        Task<Enterprise> AddEnterprise(EditEnterpriseParameters enterprise);

        Task<BookingAppBackend.Model.Users.User> GetReservations(string username);



    }
}
