﻿using BookingAppBackend.Database.Interfaces;
using BookingAppBackend.Database.Interfaces.RentACar;
using BookingAppBackend.Model.RentACar;
using BookingAppBackend.Model.RentACar.Parameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Service.RentACar.Branch
{
    public class BranchService : IBranchService
    {
        private IEnterpriseBranchRepository repo;
        private IUnitOfWork unitOfWork;

        public BranchService(IEnterpriseBranchRepository repo, IUnitOfWork unitOfWork)
        {

            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<EnterpriseBranch> AddBranch(AddBranchParameters enterpriseBranch)
        {
            try
            {
                var temp = await repo.AddBranch(enterpriseBranch);
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

        public async Task<EnterpriseBranch> DeleteBranch(int enterpriseId, int branchId)
        {
            try
            {
                var temp = await repo.DeleteBranch(enterpriseId, branchId);
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

        public async Task<EnterpriseBranch> EditBranch(EditBranchParameters enterpriseBranch)
        {
            try
            {
                var temp = await repo.EditBranch(enterpriseBranch);
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

        public async Task<IEnumerable<EnterpriseBranch>> GetAllBranches(int enterpriseId)
        {
            try
            {
                var temp = await repo.GetAllBranches( enterpriseId);
                
                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<EnterpriseBranch> GetBranchAddress(int branchId)
        {
            try
            {
                var temp = await repo.GetBranchAddress(branchId);

                return temp;
            }
            catch
            {
                return null;
            }
        }

        public async Task<EnterpriseBranch> GetOneBranch(int enterpriseId, int branchId)
        {
            try
            {
                var temp = await repo.GetOneBranch(enterpriseId, branchId);
                
                return temp;
            }
            catch
            {
                return null;
            }
        }
    }
}
