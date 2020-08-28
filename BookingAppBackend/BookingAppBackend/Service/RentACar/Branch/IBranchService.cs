using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.Branch
{
    public interface IBranchService
    {
        Task<IEnumerable<EnterpriseBranch>> GetAllBranches(int enterpriseId);
        Task<EnterpriseBranch> GetOneBranch(GetAndDeleteParameters gadp);
        Task<EnterpriseBranch> AddBranch(AddBranchParameters enterpriseBranch);
        Task<EnterpriseBranch> EditBranch(EditBranchParameters enterpriseBranch);
        Task<EnterpriseBranch> DeleteBranch(GetAndDeleteParameters gadp);
    }
}
