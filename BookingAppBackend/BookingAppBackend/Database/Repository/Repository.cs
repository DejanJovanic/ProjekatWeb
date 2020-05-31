using BookingAppBackend.Database.Contex;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository
{
    public class Repository
    {
        protected BookingAppDbContext context;

        public Repository(BookingAppDbContext context)
        {
            this.context = context;
        }
    }
}
