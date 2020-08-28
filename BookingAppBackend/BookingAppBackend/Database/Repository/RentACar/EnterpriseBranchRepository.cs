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
    public class EnterpriseBranchRepository : Repository, IEnterpriseBranchRepository
    {
        public EnterpriseBranchRepository(BookingAppDbContext context) : base(context) { }
        public async Task<EnterpriseBranch> AddBranch(AddBranchParameters enterpriseBranch)
        {
            var temp = await context.Enterprises.Include(i => i.Branches).FirstOrDefaultAsync(i => i.Id == enterpriseBranch.EnterpriseId);

            var tempBranch = new EnterpriseBranch();

            tempBranch.Name = enterpriseBranch.Name;
            tempBranch.Street = enterpriseBranch.Street;
            tempBranch.StreetNo = enterpriseBranch.StreetNo;
            tempBranch.Country = enterpriseBranch.Country;
            tempBranch.City = enterpriseBranch.City;
            tempBranch.ZipCode = enterpriseBranch.ZipCode;

            temp.Branches.Add(tempBranch);

            return tempBranch;
        }

        public async Task<EnterpriseBranch> DeleteBranch(GetAndDeleteParameters gadp)
        {
            var branch = (await context.Enterprises.Include(i => i.Branches).FirstOrDefaultAsync(enterprise => enterprise.Id == gadp.EnterpriseId)).Branches.Where(i => i.Id == gadp.ObjectId).FirstOrDefault();
            var enterprise = await context.Enterprises.Include(i => i.Branches).FirstOrDefaultAsync(i => i.Id == gadp.EnterpriseId);

            var tempBranch = branch;
            enterprise.Branches.Remove(branch);

            return tempBranch;

        }

        public async Task<EnterpriseBranch> EditBranch(EditBranchParameters enterpriseBranch)
        {
            var branch = (await context.Enterprises.Include(i => i.Branches).FirstOrDefaultAsync(enterprise => enterprise.Id == enterpriseBranch.EnterpriseId)).Branches.Where(i => i.Id == enterpriseBranch.BranchId).FirstOrDefault();

            branch.Name = enterpriseBranch.Name;
            branch.City = enterpriseBranch.City;
            branch.Country = enterpriseBranch.Country;
            branch.Street = enterpriseBranch.Street;
            branch.StreetNo = enterpriseBranch.StreetNo;
            branch.ZipCode = enterpriseBranch.ZipCode;

            return branch;

        }

        public async Task<IEnumerable<EnterpriseBranch>> GetAllBranches(int enterpriseId)
        {
            var branches = (await context.Enterprises.Include(i => i.Branches).FirstOrDefaultAsync(enterprise => enterprise.Id == enterpriseId)).Branches.ToList();

            return branches;
        }

        public async Task<EnterpriseBranch> GetOneBranch(GetAndDeleteParameters gadp)
        {
            return (await context.Enterprises.Include(i => i.Branches).FirstOrDefaultAsync(enterprise => enterprise.Id == gadp.EnterpriseId)).Branches.Where(i => i.Id == gadp.ObjectId).FirstOrDefault();
        }
    }
}
