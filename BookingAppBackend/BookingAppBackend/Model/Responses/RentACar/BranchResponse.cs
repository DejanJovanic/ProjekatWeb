using BookingAppBackend.Model.RentACar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingAppBackend.Model.Responses.RentACar
{
    public class BranchResponse : Response<EnterpriseBranch>
    {
        public BranchResponse(EnterpriseBranch eb) : base(eb) { }

        public BranchResponse(string message) : base(message) { }
    }
}

