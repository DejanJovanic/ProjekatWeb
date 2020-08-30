using BookingAppBackend.Database.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Interfaces
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
        Task StartTransaction(TransactionType type);
        Task EndTransaction();
        Task Commit();
        Task Rollback();
    }
}
