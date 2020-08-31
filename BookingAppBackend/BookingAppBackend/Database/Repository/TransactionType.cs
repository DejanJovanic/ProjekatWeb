using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Database.Repository
{
    public enum TransactionType
    {
        Normal,
        Default,
        Serializible
    }
}
