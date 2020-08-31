using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace BookingAppBackend.Database.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        BookingAppDbContext context;
        IDbContextTransaction transaction;
        public UnitOfWork(BookingAppDbContext context)
        {
            this.context = context;
            transaction = null;
        }

        public async Task StartTransaction(TransactionType type)
        {
            switch (type)
            {
                case TransactionType.Serializible:
                     transaction = await context.Database.BeginTransactionAsync(isolationLevel: System.Data.IsolationLevel.Serializable);
                    break;
                case TransactionType.Normal:
                    transaction = await context.Database.BeginTransactionAsync(isolationLevel: System.Data.IsolationLevel.ReadCommitted);

                    break;

            }
        }


        public async Task EndTransaction()
        {
            if(transaction != null)
            {
                await transaction.DisposeAsync();
            }
        }
        public async Task Commit()
        {
            if(transaction != null)
            {
                await transaction.CommitAsync();
            }
        }

        public async Task Rollback()
        {
            if (transaction != null) {
                await transaction.RollbackAsync();
            }
        }
        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
