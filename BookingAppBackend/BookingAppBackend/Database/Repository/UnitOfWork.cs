using BookingAppBackend.Database.Contex;
using BookingAppBackend.Database.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        BookingAppDbContext context;

        public UnitOfWork(BookingAppDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
